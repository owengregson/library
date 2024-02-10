let waypoints = [];
let splinePoints = [];
let fieldCanvas;
let ctx;
let ctxBackground;
let image;
let wto;
let change = "propertychange change input";
let animating = false;
let waypointsOutput;
let waypointsDialog;
let swerveHeadingsOutput;
let swerveHeadingsDialog;
let titleInput;
let interactive;
let animation;
let clipboardToast;
const TOAST_DURATION = 1000; // ms
let fileHandle;
let isReversedCheckbox = document.getElementById("Reverse-Path");
let lastFieldChosen = "season";
let isSmallField;
let selectedWaypoint;
// Instant path elements
let instantPathDialog;
let sampleRateSelector;
let sampleRate;
let startSelector;
let timeFrom;
let durationSelector;
let duration;
let wpiLogInput;

let fw = localStorage.getItem("field-length");
let fh = localStorage.getItem("field-width");
let fieldWidth = fw ? parseInt(fw) : 1654; // cm
let fieldHeight = fh ? parseInt(fh) : 802; // cm
const localVersion = "5.2";
localStorage.setItem("field-length", fieldWidth.toString());
localStorage.setItem("field-width", fieldHeight.toString());

const xOffset = 0; // cm
const yOffset = 0; // cm

let width = 1470; //pixels (1470)
let height = 778; //pixels (744)

let rw = localStorage.getItem("robot-length");
let rh = localStorage.getItem("robot-width");
let robotWidth = rw ? parseInt(rw) : 86; // cm
let robotHeight = rh ? parseInt(rh) : 86; // cm
localStorage.setItem("robot-length", robotWidth.toString());
localStorage.setItem("robot-width", robotHeight.toString());

const waypointRadius = 7;
const splineWidth = 3;

let r = Math.sqrt(Math.pow(robotWidth, 2) + Math.pow(robotHeight, 2)) / 2;
let t = Math.atan2(robotHeight, robotWidth);
let hue = 0;

const kEps = 1E-9;
const pi = Math.PI;
const TWO_PI = 2 * pi;

const Colors = {
    BOTTOM_LEFT: "#ffffc9",
    BOTTOM_RIGHT: "#fcacac",
    TOP_LEFT: "#cf9eff",
    TOP_RIGHT: "#9ecfff",
    ROBOT_CENTER: "#9ffcc3",
    LIGHT_BLUE: "#00AAFF",
    DARK_BLUE: "#0066FF",
}

const { calcSplines } = window['splines-kt'];

const {
    Pose2d,
    Rotation2d,
    Rotation2d_fromDegrees,
    Rotation2d_fromRadians,
    Translation2d
} = window['splines-kt'].com.team751.lib.geometry;

// Client-side class extensions

Rotation2d.fromDegrees = Rotation2d_fromDegrees;
Rotation2d.fromRadians = Rotation2d_fromRadians;

Object.defineProperties(Translation2d.prototype, {
    drawX: {
        get() {
            return (this._x + xOffset) * (width / fieldWidth);
        }
    },
    drawY: {
        get() {
            return height - (this._y + yOffset) * (height / fieldHeight);
        }
    },
});

function svg(tagName, attrs) {
    const svgNs = "http://www.w3.org/2000/svg";
    let element = document.createElementNS(svgNs, tagName);
    if (attrs && typeof attrs === 'object') {
        for (const [key, value] of Object.entries(attrs)) {
            element.setAttribute(key, value);
        }
    }
    return element;
}

function d2r(d) {
    return d * (pi / 180);
}

function r2d(r) {
    return r * (180 / pi);
}

function cosSinToRadians(cosAngle, sinAngle) {
    return Math.atan2(sinAngle, cosAngle);
}

function radiansToCosSin(radians) {
    return {
        _cos_angle_: Math.cos(radians),
        _sin_angle_: Math.sin(radians)
    };
}

function fillRobot(position, heading, color, scaleFactor=0.78) {
    let previous = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "destination-over";

    let translation = position.translation;

    ctx.translate(translation.drawX, translation.drawY);
    ctx.rotate(-heading);

    let w = robotWidth * (width / fieldWidth);
    let h = robotHeight * (height / fieldHeight);
    ctx.fillStyle = color || "rgba(0, 0, 0, 0)";
    ctx.fillRect(scaleFactor * (-h / 2), scaleFactor * (-w / 2), scaleFactor*h, scaleFactor*w);

    ctx.rotate(heading);
    ctx.translate(-translation.drawX, -translation.drawY);

    ctx.globalCompositeOperation = previous;
}

function hslToRgba(h, s, l, alpha = 1.0) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);

    const red = Math.round(f(0) * 255);
    const green = Math.round(f(8) * 255);
    const blue = Math.round(f(4) * 255);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getNextColor() {
    // 50% Saturation, 50% Lightness, and full opacity
    const color = hslToRgba(hue, 80, 60, 0.4);
    hue = (hue + 1) % 360;
    return color;
}

function drawRobot(position, heading, scaleFactor=0.78) {
    let h = heading;
    let angles = [h + (Math.PI / 2) + t, h - (Math.PI / 2) + t, h + (Math.PI / 2) - t, h - (Math.PI / 2) - t];

    let points = [];

    angles.forEach(function(angle) {
        const scaledR = r * scaleFactor; // scale the radius
        const point = new Translation2d(
            position.translation._x + (scaledR * Math.cos(angle)),
            position.translation._y + (scaledR * Math.sin(angle))
        );
        points.push(point);
        let color = Math.abs(angle - heading) < Math.PI / 2 ? Colors.LIGHT_BLUE : getNextColor();

        drawPoint(
            point,
            {
                color: color,
                radius: splineWidth
            }
        );
    });
}


function drawPoint(point, { color = Colors.ROBOT_CENTER, radius }) {
    ctx.beginPath();
    ctx.arc(point.drawX, point.drawY, radius, 0, TWO_PI, false);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
    ctx.lineWidth = 0;
    ctx.stroke();
}

function fixWidthHelper(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });
    return ui;
}

function initRefresh(usingSmallField, fieldName) {
    if (usingSmallField) {
        fieldWidth = 912; // cm
        fieldHeight = 823; // cm

        width = 1120; //pixels
        height = 1110; //pixels
    } else {
        fieldWidth = 1654; // cm
        fieldHeight = 802; // cm

        width = 1654; //pixels
        height = 802; //pixels
    }

    init(fieldName);
}

function setCanvasSizes() {
    // Set the size for all related elements to maintain consistency.
    const widthString = `${width / 1.5}px`;
    const heightString = `${height / 1.5}px`;
    $('#field, #background, #canvases, #interactive')
        .css({"width": widthString, "height": heightString});
}

function initializeCanvasContexts() {
    // Initialize primary canvas contexts for drawing.
    fieldCanvas = document.getElementById('field');
    ctx = fieldCanvas.getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#FF0000";

    ctxBackground = document.getElementById('background').getContext('2d');
    ctxBackground.canvas.width = width;
    ctxBackground.canvas.height = height;
    ctx.clearRect(0, 0, width, height);
}

function configureInteractiveCanvas() {
    // Setup interactive canvas for user interactions.
    interactive = document.getElementById('interactive');
    interactive.setAttribute("width", width);
    interactive.setAttribute("height", height);
    interactive.setAttribute("viewBox", `0 0 ${width} ${height}`);
    interactive.addEventListener('click', onCanvasClick);
}

function loadImageBasedOnField(fieldName) {
    // Determine the image source based on the field name and load it.
    let src = "";
    switch (fieldName) {
        case "crescendo":
            src = "https://uploads-ssl.webflow.com/645accb94a84d4211340007c/65c65b2301d714a18f2faac1_FieldResized.png";
            break; // Added missing break statements
        case "charged up":
            src = "https://uploads-ssl.webflow.com/645accb94a84d4211340007c/65a32f800d444dfb5d1c8924_season.jpg";
            break;
        default:
            src = "https://uploads-ssl.webflow.com/645accb94a84d4211340007c/65c65b2301d714a18f2faac1_FieldResized.png";
    }

    image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = function() {
        ctxBackground.drawImage(image, 0, 0, width, height);
        update(false);
    };
}

function initializeUIComponents() {
    // Initialize UI components and bind events.
    waypointsDialog = document.getElementById('waypointsDialog');
    swerveHeadingsDialog = document.getElementById('swerveHeadingsDialog');
    waypointsOutput = document.getElementById('waypointsOutput');
    swerveHeadingsOutput = document.getElementById('swerveHeadingsOutput');
    clipboardToast = document.getElementById('clipboardToast');

    // Setup sample rate and duration inputs.
    sampleRateSelector = document.getElementById('sampleRateSelector');
    startSelector = document.getElementById('startSelector');
    durationSelector = document.getElementById('durationSelector');
    wpiLogInput = document.getElementById('wpiLogInput');

    sampleRate = parseFloat(sampleRateSelector.value);
    timeFrom = parseInt(startSelector.value);
    duration = parseInt(durationSelector.value);

    // Event listeners for UI inputs.
    setupUIEventListeners();
}

function setupUIEventListeners() {
    // Bind event listeners to UI components for interaction.
    wpiLogInput.addEventListener('change', handleWPILog);
    sampleRateSelector.oninput = () => sampleRate = parseFloat(sampleRateSelector.value);
    startSelector.oninput = () => timeFrom = parseInt(startSelector.value);
    durationSelector.oninput = () => duration = Math.min(parseInt(durationSelector.value), 15); // Limit duration to 15 seconds.
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyS' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            saveFile();
        }
    });

    // Make table rows sortable and rebind events after update.
    $('table tbody').sortable({
        helper: fixWidthHelper,
        update: update,
        forcePlaceholderSize: true,
    }).disableSelection();
    
    rebind();
}

function init(fieldName) {
    setCanvasSizes();
    initializeCanvasContexts();
    configureInteractiveCanvas();
    loadImageBasedOnField(fieldName);
    initializeUIComponents();
    // Additional setup as necessary...
}

function clearSplines() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#FF0000";
}

function clear() {
    clearSplines();

	ctxBackground.clearRect(0, 0, width, height);
    ctxBackground.fillStyle = "#FF0000";
    ctxBackground.drawImage(image, 0, 0, width, height);

    while (interactive.lastChild) {
        interactive.removeChild(interactive.lastChild);
    }
}

function rebind() {
    let input = $('.data-input');
    input.unbind(change);
    input.bind(change, function() {
        cancelAnimationFrame(wto);
        wto = requestAnimationFrame(function() {
            update();
        });
    });
}

function addPoint() {
	let prev;
	if (waypoints.length > 0) prev = waypoints[waypoints.length - 1].translation;
	else prev = new Translation2d(50, 50);
	_addPoint(prev._x + 50, prev._y + 50);
}

function _addPoint(x, y, heading = 0, comment = "", event = "", doUpdate = true) {
    $("tbody").append("<tr>" + "<td class='drag-handler'><i class='material-icons'>===</i></td>"
        + `<td class='x'><input type='number' class='data-input' value='${x}'></td>`
        + `<td class='y'><input type='number' class='data-input' value='${y}'></td>`
        + `<td class='heading'><input type='number' class='data-input' value='${heading}'></td>`
        + `<td class='comments'><input type='search' class='comments-input' placeholder='Comments' value='${comment}'></td>`
        + `<td class='event'><input type='search' class='event-input' placeholder='Event' value='${event}'></td>`
        + "<td class='enabled'><input type='checkbox' class='data-input' checked></td>"
        + "<td class='delete'><button onclick='$(this).parent().parent().remove();update()' class='icon-button'><i class='material-icons'>x</i></button></td></tr>");
    if (doUpdate) {
        update();
        rebind();
    }
}

function getCursorPosition(event) {
    const rect = interactive.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) * (width / rect.width),
        y: (event.clientY - rect.top) * (height / rect.height),
    };
}

function onCanvasClick(event) {
    let { x: canvasX, y: canvasY } = getCursorPosition(event);
    let { x, y } = canvasToFieldCoords(canvasX, canvasY);
    _addPoint(x, y);
}

function canvasToFieldCoords(canvasX, canvasY) {
    let x = Math.round(canvasX * (fieldWidth / width) - xOffset);
    let y = Math.round((height - canvasY) * (fieldHeight / height) - yOffset);
    return { x, y };
}

// ======================== END: CANVAS

// ================= SECTION: WAYPOINTS

function selectWaypoint(el) {
    if (el === selectedWaypoint) return;
    if (selectedWaypoint) {
        selectedWaypoint.removeAttribute('data-selected');
    }
    selectedWaypoint = el;
    if (selectedWaypoint) {
        selectedWaypoint.setAttribute('data-selected', true);
    }
}

function handleWaypointDragStart(event) {
    selectWaypoint(event.target);
    fieldCanvas.classList.add('faded');
    interactive.addEventListener('mousemove', handleWaypointDrag);
    interactive.addEventListener('mouseup', handleWaypointDragEnd);
}

function handleWaypointDrag(event) {
    if (selectedWaypoint) {
        event.preventDefault();
        let { x: canvasX, y: canvasY } = getCursorPosition(event);
        selectedWaypoint.setAttribute("cx", canvasX);
        selectedWaypoint.setAttribute("cy", canvasY);
        let index = selectedWaypoint.getAttribute('data-index');
        let { x, y } = canvasToFieldCoords(canvasX, canvasY);
        waypoints[index].translation._x = x;
        waypoints[index].translation._y = y;

        recalculateSplines(waypoints, 4);
    }
}

function handleWaypointClick(event) {
    event.stopPropagation();
}

function handleWaypointDragEnd(event) {
    if (selectedWaypoint) {
        let { x: canvasX, y: canvasY } = getCursorPosition(event);
        let { x, y } = canvasToFieldCoords(canvasX, canvasY);
        modifyWaypoint(selectedWaypoint.getAttribute('data-index'), x, y);
        selectWaypoint(null);
    }
    fieldCanvas.classList.remove('faded');
    interactive.removeEventListener('mousemove', handleWaypointDrag);
    interactive.removeEventListener('mouseup', handleWaypointDragEnd);
}

function modifyWaypoint(index, x, y) {
    let tr = $('tbody').children('tr')[index];
    let xInput = tr.querySelector('.x input');
    let yInput = tr.querySelector('.y input');

    xInput.value = x;
    yInput.value = y;

    update();
    rebind();
}

// ===================== END: WAYPOINTS

// =================== SECTION: DRAWING

function draw(style) {
    if (style === 4) {
        clearSplines();
        drawSplines(true);
        drawSplines(false);
        return;
    }
    clear();
    if (style === 3) { } else {
        drawWaypoints();
    }

    switch (style) {
        // waypoints only
        case 1:
            break;
        // all
        case 2:
            drawSplines(true);
            drawSplines(false);
            break;
        case 3:
            animate();
            break;
    }
}

function update(modified = true) {
    if (animating) {
        return;
    }

	waypoints = [];
	let data = "";
	$('tbody').children('tr').each(function() {
		let x = parseInt($($($(this).children()).children()[1]).val());
		let y = parseInt($($($(this).children()).children()[2]).val());
		let heading = Math.round(parseInt($($($(this).children()).children()[3]).val()));
		if (isNaN(heading)) {
			heading = 0;
        }
        let comment = ($($($(this).children()).children()[4]).val());
        let event = ($($($(this).children()).children()[5]).val());
        let enabled = ($($($(this).children()).children()[6]).prop('checked'));
		if (enabled) {
            waypoints.push(new Pose2d(new Translation2d(x, y), Rotation2d.fromDegrees(heading), comment, event));
        }
    });

    draw(1);

    if (modified) {
        setModified(true);
    }

    recalculateSplines(waypoints, 2);
}

// ======================= END: DRAWING

// ======== SECTION: INTERMEDIATE POINTS

function quadBezierInterpolate(start, control, end, t) {
    // Quadratic Bezier curve calculation
    return (1 - t) * (1 - t) * start + 2 * (1 - t) * t * control + t * t * end;
}

function quadraticBezier(p0, cp, p1, t) {
    let x = (1 - t) * (1 - t) * p0._x + 2 * (1 - t) * t * cp._x + t * t * p1._x;
    let y = (1 - t) * (1 - t) * p0._y + 2 * (1 - t) * t * cp._y + t * t * p1._y;
    return { _x: x, _y: y };
}

function interpolatePose2D(p0, p1, cp, t) {
    let interpolatedTranslation = quadraticBezier(p0.translation, cp, p1.translation, t);

    let startRadians = cosSinToRadians(p0.rotation._cos_angle_, p0.rotation._sin_angle_);
    let endRadians = cosSinToRadians(p1.rotation._cos_angle_, p1.rotation._sin_angle_);
    let midRadians = (startRadians + endRadians) / 2;
    let interpolatedRadians = quadBezierInterpolate(startRadians, midRadians, endRadians, t);
    let interpolatedRotation = radiansToCosSin(interpolatedRadians);

    return new Pose2d(
        new Translation2d(interpolatedTranslation._x, interpolatedTranslation._y),
        {
            ...interpolatedRotation,
            degrees: r2d(interpolatedRadians),
            radians: interpolatedRadians
        }
    );
}

function catmullRomInterpolate(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    let v0 = (p2._x - p0._x) / 2;
    let v1 = (p3._x - p1._x) / 2;
    let x = (2 * p1._x - 2 * p2._x + v0 + v1) * t3 + (-3 * p1._x + 3 * p2._x - 2 * v0 - v1) * t2 + v0 * t + p1._x;

    v0 = (p2._y - p0._y) / 2;
    v1 = (p3._y - p1._y) / 2;
    let y = (2 * p1._y - 2 * p2._y + v0 + v1) * t3 + (-3 * p1._y + 3 * p2._y - 2 * v0 - v1) * t2 + v0 * t + p1._y;

    return { _x: x, _y: y };
}

function calculateDistance(p1, p2) {
    const dx = p2.translation._x - p1.translation._x;
    const dy = p2.translation._y - p1.translation._y;
    return Math.sqrt(dx * dx + dy * dy);
}

function extendLine(p1, p2, extensionFactor = 1.0) {
    // Creates an extended point in the direction from p1 to p2
    return {
        translation: {
            _x: p2.translation._x + extensionFactor * (p2.translation._x - p1.translation._x),
            _y: p2.translation._y + extensionFactor * (p2.translation._y - p1.translation._y)
        },
        rotation: p2.rotation // Copy the rotation from the end point
    };
}

function normalizeAngle(angle) {
    while (angle > pi) angle -= TWO_PI;
    while (angle < -pi) angle += TWO_PI;
    return angle;
}

function calculateIntermediatePoints(inputPoints, density = 0.5) {
    if (inputPoints.length < 2) {
        throw new Error("At least two input points are required to create a path.");
    }

    if (inputPoints.length === 2) {
        let result = [];
        let startRotation = normalizeAngle(cosSinToRadians(inputPoints[0].rotation._cos_angle_, inputPoints[0].rotation._sin_angle_));
        let endRotation = normalizeAngle(cosSinToRadians(inputPoints[1].rotation._cos_angle_, inputPoints[1].rotation._sin_angle_));

        const segmentDistance = calculateDistance(inputPoints[0], inputPoints[1]);
        const numIntermediatePoints = Math.max(Math.ceil(segmentDistance * density), 1);

        for (let i = 0; i <= numIntermediatePoints; i++) {
            let t = i / numIntermediatePoints;
            let interpolatedTranslation = catmullRomInterpolate(inputPoints[0].translation, inputPoints[0].translation, inputPoints[1].translation, inputPoints[1].translation, t);
            let interpolatedRadians = normalizeAngle(quadBezierInterpolate(startRotation, (startRotation + endRotation) / 2, endRotation, t));
            let interpolatedRotation = radiansToCosSin(interpolatedRadians);

            result.push(new Pose2d(
                new Translation2d(interpolatedTranslation._x, interpolatedTranslation._y),
                {
                    ...interpolatedRotation,
                    degrees: r2d(interpolatedRadians),
                    radians: interpolatedRadians
                }
            ));
        }

        return result;
    }

    // extend the path with more 'phantom-points' since catmull rom requires 4 points
    const firstPoint = inputPoints[0];
    const secondPoint = inputPoints[1];
    const secondLastPoint = inputPoints[inputPoints.length - 2];
    const lastPoint = inputPoints[inputPoints.length - 1];
    let startPoint = inputPoints.length < 3 ? extendLine(secondPoint, firstPoint, -1.0) : firstPoint;
    let endPoint = inputPoints.length < 3 ? extendLine(secondLastPoint, lastPoint, 1.0) : lastPoint;
    let extendedPoints = [startPoint, ...inputPoints, endPoint];

    let result = [];
    let startRotation = normalizeAngle(cosSinToRadians(extendedPoints[0].rotation._cos_angle_, extendedPoints[0].rotation._sin_angle_));
    let segmentStartIndex = 1; // start from the second point

    // add first point with whatever rotation it was already (to avoid assuming we can be rotated at the first point)
    result.push(new Pose2d(
        new Translation2d(extendedPoints[0].translation._x, extendedPoints[0].translation._y),
        {
            _cos_angle_: extendedPoints[0].rotation._cos_angle_,
            _sin_angle_: extendedPoints[0].rotation._sin_angle_,
            degrees: r2d(startRotation),
            radians: startRotation
        }
    ));

    for (let i = 1; i < extendedPoints.length - 1; i++) {
        let currentRotation = normalizeAngle(cosSinToRadians(extendedPoints[i].rotation._cos_angle_, extendedPoints[i].rotation._sin_angle_));
        let nextRotation = normalizeAngle(cosSinToRadians(extendedPoints[i + 1].rotation._cos_angle_, extendedPoints[i + 1].rotation._sin_angle_));

        if (currentRotation !== nextRotation || i === extendedPoints.length - 2) {
            let controlRotation = (startRotation + nextRotation) / 2;
            let endRotation = nextRotation;

            for (let j = segmentStartIndex; j <= i; j++) {
                let p0 = extendedPoints[Math.max(j - 1, 0)];
                let p1 = extendedPoints[j];
                let p2 = extendedPoints[Math.min(j + 1, extendedPoints.length - 1)];
                let p3 = extendedPoints[Math.min(j + 2, extendedPoints.length - 1)];

                const segmentDistance = calculateDistance(p1, p2);

                let numIntermediatePoints = Math.max(Math.ceil(segmentDistance * density), 1);
                if(segmentDistance < 10) { numIntermediatePoints = 0; }
                //if (segmentDistance < 140) { numIntermediatePoints = Math.round((numIntermediatePoints * roundOff(segmentDistance/272))); }
                
                // START PEDUM CODE
                
                const numIntermediatePoints1 = 10;
                //if (segmentDistance < 140) { numIntermediatePoints = Math.round((numIntermediatePoints * roundOff(segmentDistance/272))); }
                var previousPoint = inputPoints[0].translation;
                var previousDerivative = 0;
                var maxSecondDerivative = 0;

                for (let k = 0; k <= numIntermediatePoints1; k++) {
                    let t = k / numIntermediatePoints1;
                    let interpolatedTranslation = catmullRomInterpolate(p0.translation, p1.translation, p2.translation, p3.translation, t);

                    const xDifference = interpolatedTranslation._x - previousPoint._x;

                    if (xDifference < 0.01){
                        const firstDerivative = (interpolatedTranslation._y - previousPoint._y)/(interpolatedTranslation._x - previousPoint._x);
                        if (previousDerivative === 0) previousDerivative = firstDerivative;
                        const secondDerivative = firstDerivative-previousDerivative/(interpolatedTranslation._x - previousPoint._x);

                        console.log("\n\ngabus");
                        console.log(firstDerivative);
                        console.log(secondDerivative);
                        console.log("gabus\n\n");
                                
                        if (secondDerivative > maxSecondDerivative) maxSecondDerivative = secondDerivative;
                        previousDerivative = firstDerivative;
                        previousPoint = interpolatedTranslation;
                    }
                }

                console.log("\n\ngaybi");
                console.log(maxSecondDerivative);
                console.log("gabi\n\n");

                // dumbass
                // END PEDUM CODE

                for (let k = 0; k <= numIntermediatePoints; k++) {
                    let t = k / numIntermediatePoints;
                    let interpolatedTranslation = catmullRomInterpolate(p0.translation, p1.translation, p2.translation, p3.translation, t);

                    let segmentProgress = (j - segmentStartIndex + t) / (i - segmentStartIndex + 1);
                    let interpolatedRadians = normalizeAngle(quadBezierInterpolate(startRotation, controlRotation, endRotation, segmentProgress));
                    let interpolatedRotation = radiansToCosSin(interpolatedRadians);

                    result.push(new Pose2d(
                        new Translation2d(interpolatedTranslation._x, interpolatedTranslation._y),
                        {
                            ...interpolatedRotation,
                            degrees: r2d(interpolatedRadians),
                            radians: interpolatedRadians
                        }
                    ));
                }
            }

            // update next segment
            startRotation = nextRotation;
            segmentStartIndex = i + 1;
        }
    }
    // remove duplicate points in the path
    let filteredResult = [];
    let lp = null;
    for (const point of result) {
        if (lp === null || point.translation._x !== lp.translation._x || point.translation._y !== lp.translation._y) {
            filteredResult.push(point);
            lp = point;
        }
    }
    return filteredResult;
}

function calculateAndParseSplines(inputPoints) {
    let result = calculateIntermediatePoints(inputPoints, 0.23);
    return result;
}

let roundOff = (num, places) => {
    const x = Math.pow(10,places);
    return Math.round(num * x) / x;
}

// ============ END: INTERMEDIATE POINTS

function shfff(inStr, x = 1, de = false) {
    // Check if the string is empty or x is 0
    if (inStr.length === 0 || x === 0) {
        return inStr;
    }

    // Normalize x to be within the length of the string
    x = x % inStr.length;
    if (x < 0) {
        x += inStr.length; // Make sure x is positive
    }

    if (de) {
        // For decrypting, shift the string left by x
        return inStr.slice(x) + inStr.slice(0, x);
    } else {
        // For encrypting, shift the string right by x
        return inStr.slice(-x) + inStr.slice(0, -x);
    }
}

function base64Encode(str) {
    return new Promise((resolve, reject) => {
        const blob = new Blob([str], { type: 'text/plain' });
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result
                .replace(/^data:.+;base64,/, '');
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function makeData() {
    const orderedWaypoints = isReversedCheckbox.checked ? waypoints.slice(0).reverse() : waypoints;
    let pathPoints = document.getElementById("pathPoints");
    for (let i = 0; i < pathPoints.rows.length; i++) {
        let row = pathPoints.rows[i];
        const comment = row.getElementsByClassName("comments")[0].getElementsByTagName("input")[0].value;
        orderedWaypoints[i].comment = comment;
        const event = row.getElementsByClassName("event")[0].getElementsByTagName("input")[0].value;
        orderedWaypoints[i].event = event;
        orderedWaypoints[i].waypoint = true;
    }
    let smoothedPoints = calculateAndParseSplines(orderedWaypoints);
    for (let i = 0; i < orderedWaypoints.length; i++) {
        for (let j = 0; j < smoothedPoints.length; j++) {
            if (roundOff(orderedWaypoints[i].translation._x, 2) === roundOff(smoothedPoints[j].translation._x, 2) && roundOff(orderedWaypoints[i].translation._y, 2) === roundOff(smoothedPoints[j].translation._y, 2)) {
                smoothedPoints[j].comment = orderedWaypoints[i].comment;
                smoothedPoints[j].event = orderedWaypoints[i].event;
                smoothedPoints[j].waypoint = orderedWaypoints[i].waypoint;
            }
        }
    }
    // remove any points with x and y NaN
    smoothedPoints = smoothedPoints.filter(p => !isNaN(p.translation._x) && !isNaN(p.translation._y));
    let dataForm = makeWaypointsList(smoothedPoints);
    // await the promise and get the result then pass it in
    //dataForm = await base64Encode(dataForm);
    return dataForm;
}

async function downloadPath(name) {
    let data = await makeData();
    let blob = new Blob([data], { type: 'text/plain' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = (name ? name : "routine") + ".b2path";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function recalculateSplines(waypointsList, drawStyle) {
    const orderedWaypoints = isReversedCheckbox.checked ? waypointsList.slice(0).reverse() : waypointsList;
    const data = orderedWaypoints.map(point => (
        `${point.translation.x},${point.translation.y},${Math.round(point.rotation.degrees)}`
    )).join(';');

    if (data.length !== 0) {
        splinePoints = calculateAndParseSplines(orderedWaypoints);
        draw(drawStyle);
    }
}

function drawWaypoints() {
	waypoints.forEach((waypoint, i) => {
        drawInteractivePoint(waypoint, waypointRadius, i);
        drawRobot(waypoint, waypoint.rotation.radians);
    });
}

function drawInteractivePoint(waypoint, radius, index) {
    let point = svg('circle', {
        fill: Colors.ROBOT_CENTER,
        cx: waypoint.translation.drawX,
        cy: waypoint.translation.drawY,
        r: radius,
        'data-index': index,
    });

    point.addEventListener('mousedown', handleWaypointDragStart);
    point.addEventListener('click', handleWaypointClick);

    interactive.appendChild(point);
}

function animate() {
    drawSplines(false, true);
}

function drawSplines(fill, animate) {
    animate = animate || false;
    let i = 0;

    if (animate) {
        let requestId;
        cancelAnimationFrame(animation);

        function animLoop() {
            if (i === splinePoints.length) {
                animating = false;
                cancelAnimationFrame(animation);
                update();
                return;
            }

            animating = true;

            let splinePoint = splinePoints[i];
            let hue = Math.round(180 * (i++ / splinePoints.length));

            let previous = ctx.globalCompositeOperation;
            fillRobot(splinePoint, splinePoint.rotation.radians, 'hsla(' + hue + ', 100%, 50%, 0.015)');
            ctx.globalCompositeOperation = "source-over";
            drawRobot(splinePoint, splinePoint.rotation.radians);
            drawPoint(splinePoint.translation, { radius: splineWidth });
            ctx.globalCompositeOperation = previous;

            animation = requestAnimationFrame(animLoop);
        }
        animation = requestAnimationFrame(animLoop)
    } else {
        splinePoints.forEach((splinePoint) => {
            drawPoint(splinePoint.translation, { radius: splineWidth });

            if (fill) {
                let index = isReversedCheckbox.checked ? (splinePoints.length - i++) : i++;
                let hue = Math.round(180 * (index / splinePoints.length));
                fillRobot(splinePoint, splinePoint.rotation.radians, 'hsla(' + hue + ', 100%, 50%, 0.025)');
            } else {
                drawRobot(splinePoint, splinePoint.rotation.radians);
            }
        });
    }
}

function showInstantPathInput() {
    instantPathDialog.showModal();
}

function generatePointsFromFile() {
    decodeWPILOG(dataAsUint8, timeFrom, (duration + timeFrom), sampleRate);
    waypoints = [];
    $('tbody').empty();
    pointsToGenerate.forEach(
        (waypoint) => {
            //console.log(typeof waypoint[0])
            _addPoint(waypoint[0] * 100,waypoint[1] * 100,waypoint[2], false);
        }
    )
    update(true);
    rebind();
}

function makeWaypointsList(waypoints) {
    /* JSON:
    {
        "points": [
            {
                "x": 0,
                "y": 0,
                "r": 0,
                "e": "start",
                "c": "Hello!"
            },
            ...
            {
                "x": 0,
                "y": 0,
                "r": 0,
                "e": "end",
                "c": "Hello!"
            }
        ]
    }

    COORDS ARE:
    X: waypoint.translation.x() / 100.0
    Y: waypoint.translation.y() / 100.0
    R: Math.round(waypoint.rotation.degrees)
    E: waypoint.event ? waypoint.event : '' (IF ITS THE FIRST ONE, ITS "start" IF ITS THE LAST ONE ITS "end")
    C: waypoint.comment ? waypoint.comment : ''
    W: waypoint.waypoint ? 'true' : 'false' (If it's an actual waypoint plotted on the field)
    */

    // Merge the two canvases (fieldCanvas and ctxBackground, interactive) into one image
    let mergedCanvas = document.getElementById("mergedCanvas");
    mergedCanvas.width = width;
    mergedCanvas.height = height;
    let mergedCtx = mergedCanvas.getContext('2d');
    mergedCtx.drawImage(ctxBackground.canvas, 0, 0);
    mergedCtx.drawImage(fieldCanvas, 0, 0);
    // write the svgs from interactive to the canvas
    let svgString = new XMLSerializer().serializeToString(interactive);
    let svg = new Blob([svgString], {type: 'image/svg+xml'});
    let url = URL.createObjectURL(svg);
    let img = new Image();
    img.onload = function() {
        mergedCtx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
    };
    img.src = url;
    let pathPreview = mergedCanvas.toDataURL('image/png');
    pathPreview = pathPreview.replace("data:image/png;base64,", "");
    return '{\n\t"version": "' + localVersion + '",\n\t"preview": ' + `"${pathPreview}"` + ', \n\t"points": [\n\t\t' + waypoints.map((waypoint, i) => {
        return '{\n\t\t\t"x": ' + (waypoint.translation.x() / 100.0).toFixed(9)
            + ',\n\t\t\t"y": ' + (waypoint.translation.y() / 100.0).toFixed(9)
            + ',\n\t\t\t"r": ' + (waypoint.rotation.degrees).toFixed(9)
            + ',\n\t\t\t"e": "' + (i === 0 ? 'start' : (i === waypoints.length - 1 ? 'end' : (waypoint.event ? waypoint.event : '')))
            + '",\n\t\t\t"c": "' + (waypoint.comment ? waypoint.comment : '')
            + '",\n\t\t\t"w": "' + (waypoint.waypoint ? 'true' : 'false')
            + '"\n\t\t}';
    }).join(',\n\t\t') + '\n\t]\n}';
}

function importFile(data) {
    waypoints = [];
    $('tbody').empty();

    // imported as JSON data, only get points whcih have "w": "true"
    let points = data.points.filter(p => p.w === "true");

    for(let {x, y, r, c, e} of points) {
        if(e == "start" || e == "end") e = "";
        _addPoint(Math.round(x * 100), Math.round(y * 100), Math.round(r), c, e, false);
    }

    update(false);
    rebind();
}

function setModified(modified) {
    if (modified) {
        document.documentElement.setAttribute('data-modified', 'true');
    } else {
        document.documentElement.removeAttribute('data-modified');
    }
}

const filePickerOptions = {
    types: [
        {
            description: 'barn2path files',
            accept: {
                'text/plain': ['.b2path'],
                'text/json': ['.b2path'],
            },
        },
    ],
};

async function openFile() {
    [fileHandle] = await window.showOpenFilePicker(filePickerOptions);
    const file = await fileHandle.getFile();
    await loadFromFile(file);
}

async function loadFromFile(file) {
    titleInput.value = file.name.slice(0, -4);
    const text = await file.text();
    // parse text into JSOn object
    const JSONData = JSON.parse(text);
    //loadWaypoints(text);
    importFile(JSONData);
}

function reflectWaypoints() {
    // reflect the waypoints over the center of the field (get them from the table and update the table)
    let pathPoints = document.getElementById("pathPoints");
    let newWaypoints = [];
    const centerX = fieldWidth / 2;
    for (let i = 0; i < pathPoints.rows.length; i++) {
        let row = pathPoints.rows[i];
        let x = row.getElementsByClassName("x")[0].getElementsByTagName("input")[0].value;
        let y = row.getElementsByClassName("y")[0].getElementsByTagName("input")[0].value;
        let heading = row.getElementsByClassName("heading")[0].getElementsByTagName("input")[0].value;
        let comment = row.getElementsByClassName("comments")[0].getElementsByTagName("input")[0].value;
        let event = row.getElementsByClassName("event")[0].getElementsByTagName("input")[0].value;
        // reflect the coordinates over the center of the field
        x = centerX + (centerX - x);
        // reflect the heading
        heading = (heading + 180) % 360;
        newWaypoints.push({ x, y, heading, comment, event });
    }
    // clear the table
    $('tbody').empty();
    // add the reflected waypoints to the table
    newWaypoints.forEach(waypoint => {
        _addPoint(waypoint.x, waypoint.y, waypoint.heading, waypoint.comment, waypoint.event, false);
    });
    // update the table
    waypoints = newWaypoints;
    update();
}
