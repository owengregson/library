!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var s=e();for(var i in s)("object"==typeof exports?exports:t)[i]=s[i]}}(window,function(){return function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}({"./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */function(t,e){var s;s=function(){return this}();try{s=s||new Function("return this")()}catch(t){"object"==typeof window&&(s=window)}t.exports=s},"./src/Events.ts":
/*!***********************!*\
  !*** ./src/Events.ts ***!
  \***********************/
/*! no static exports found */function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){const e={};let s;t.attach=function(t,s){e[t]||(e[t]=[]),e[t].push(s)},t.fire=function(t,s=[]){e[t]&&e[t].forEach(t=>{t(...s)})},t.remove=function(t,s){s||delete e[t],e[t]&&(e[t]=e[t].filter(t=>s!==t))},t.dom=function(t,e,i){return s||(s=t.addEventListener?(t,e,s)=>t.addEventListener(e,s,!1):"function"==typeof t.attachEvent?(t,e,s)=>t.attachEvent(`on${e}`,s,!1):(t,e,s)=>t[`on${e}`]=s),s(t,e,i)}}(e.Events||(e.Events={}))},"./src/Timer.ts":
/*!**********************!*\
  !*** ./src/Timer.ts ***!
  \**********************/
/*! no static exports found */function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(/*! ./ifvisible */"./src/ifvisible.ts");e.default=class{constructor(t,e,s){this.ifvisible=t,this.seconds=e,this.callback=s,this.stopped=!1,this.start(),this.ifvisible.on("statusChanged",t=>{!1===this.stopped&&(t.status===i.STATUS_ACTIVE?this.start():this.pause())})}start(){this.stopped=!1,clearInterval(this.token),this.token=setInterval(this.callback,1e3*this.seconds)}stop(){this.stopped=!0,clearInterval(this.token)}resume(){this.start()}pause(){this.stop()}}},"./src/ifvisible.ts":
/*!**************************!*\
  !*** ./src/ifvisible.ts ***!
  \**************************/
/*! no static exports found */function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(/*! ./Events */"./src/Events.ts"),n=s(/*! ./Timer */"./src/Timer.ts");let o,r;e.STATUS_ACTIVE="active",e.STATUS_IDLE="idle",e.STATUS_HIDDEN="hidden",e.IE=function(){let t=3;const e=document.createElement("div"),s=e.getElementsByTagName("i");for(;e.innerHTML=`\x3c!--[if gt IE ${++t}]><i></i><![endif]--\x3e`,s[0];);return t>4?t:void 0}();e.IfVisible=class{constructor(t,s){if(this.root=t,this.doc=s,this.status=e.STATUS_ACTIVE,this.VERSION="2.0.11",this.timers=[],this.idleTime=3e4,this.isLegacyModeOn=!1,void 0!==this.doc.hidden?(o="hidden",r="visibilitychange"):void 0!==this.doc.mozHidden?(o="mozHidden",r="mozvisibilitychange"):void 0!==this.doc.msHidden?(o="msHidden",r="msvisibilitychange"):void 0!==this.doc.webkitHidden&&(o="webkitHidden",r="webkitvisibilitychange"),void 0===o)this.legacyMode();else{const t=()=>{this.doc[o]?this.blur():this.focus()};t(),i.Events.dom(this.doc,r,t)}this.startIdleTimer(),this.trackIdleStatus()}legacyMode(){if(this.isLegacyModeOn)return;let t="blur";e.IE<9&&(t="focusout"),i.Events.dom(this.root,t,()=>this.blur()),i.Events.dom(this.root,"focus",()=>this.focus()),this.isLegacyModeOn=!0}startIdleTimer(t){t instanceof MouseEvent&&0===t.movementX&&0===t.movementY||(this.timers.map(clearTimeout),this.timers.length=0,this.status===e.STATUS_IDLE&&this.wakeup(),this.idleStartedTime=+new Date,this.timers.push(setTimeout(()=>{if(this.status===e.STATUS_ACTIVE||this.status===e.STATUS_HIDDEN)return this.idle()},this.idleTime)))}trackIdleStatus(){i.Events.dom(this.doc,"mousemove",this.startIdleTimer.bind(this)),i.Events.dom(this.doc,"mousedown",this.startIdleTimer.bind(this)),i.Events.dom(this.doc,"keyup",this.startIdleTimer.bind(this)),i.Events.dom(this.doc,"touchstart",this.startIdleTimer.bind(this)),i.Events.dom(this.root,"scroll",this.startIdleTimer.bind(this)),this.focus(this.startIdleTimer.bind(this))}on(t,e){return i.Events.attach(t,e),this}off(t,e){return i.Events.remove(t,e),this}setIdleDuration(t){return this.idleTime=1e3*t,this.startIdleTimer(),this}getIdleDuration(){return this.idleTime}getIdleInfo(){const t=+new Date;let s;if(this.status===e.STATUS_IDLE)s={isIdle:!0,idleFor:t-this.idleStartedTime,timeLeft:0,timeLeftPer:100};else{const e=this.idleStartedTime+this.idleTime-t;s={isIdle:!1,idleFor:t-this.idleStartedTime,timeLeft:e,timeLeftPer:parseFloat((100-100*e/this.idleTime).toFixed(2))}}return s}idle(t){return t?this.on("idle",t):(this.status=e.STATUS_IDLE,i.Events.fire("idle"),i.Events.fire("statusChanged",[{status:this.status}])),this}blur(t){return t?this.on("blur",t):(this.status=e.STATUS_HIDDEN,i.Events.fire("blur"),i.Events.fire("statusChanged",[{status:this.status}])),this}focus(t){return t?this.on("focus",t):this.status!==e.STATUS_ACTIVE&&(this.status=e.STATUS_ACTIVE,i.Events.fire("focus"),i.Events.fire("wakeup"),i.Events.fire("statusChanged",[{status:this.status}])),this}wakeup(t){return t?this.on("wakeup",t):this.status!==e.STATUS_ACTIVE&&(this.status=e.STATUS_ACTIVE,i.Events.fire("wakeup"),i.Events.fire("statusChanged",[{status:this.status}])),this}onEvery(t,e){return new n.default(this,t,e)}now(t){return void 0!==t?this.status===t:this.status===e.STATUS_ACTIVE}}},"./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});const i=s(/*! ./ifvisible */"./src/ifvisible.ts"),n="object"==typeof self&&self.self===self&&self||"object"==typeof t&&t.global===t&&t||this;e.ifvisible=new i.IfVisible(n,document)}).call(this,s(/*! ./../node_modules/webpack/buildin/global.js */"./node_modules/webpack/buildin/global.js"))},0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */function(t,e,s){t.exports=s(/*! ./src/main.ts */"./src/main.ts")}})});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9FdmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1RpbWVyLnRzIiwid2VicGFjazovLy8uL3NyYy9pZnZpc2libGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiXSwibmFtZXMiOlsicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiYSIsImkiLCJ3aW5kb3ciLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwibCIsIm1vZHVsZXMiLCJjYWxsIiwibSIsImMiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ2YWx1ZSIsInQiLCJtb2RlIiwiX19lc01vZHVsZSIsIm5zIiwiY3JlYXRlIiwia2V5IiwiYmluZCIsIm4iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJnIiwidGhpcyIsIkZ1bmN0aW9uIiwiZSIsIkV2ZW50cyIsInN0b3JlIiwic2V0TGlzdGVuZXIiLCJhdHRhY2giLCJldmVudCIsImNhbGxiYWNrIiwicHVzaCIsImZpcmUiLCJhcmdzIiwiZm9yRWFjaCIsInJlbW92ZSIsImZpbHRlciIsInNhdmVkQ2FsbGJhY2siLCJkb20iLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImVsIiwiZXYiLCJmbiIsImF0dGFjaEV2ZW50IiwiaWZ2aXNpYmxlIiwic2Vjb25kcyIsInN0b3BwZWQiLCJzdGFydCIsIm9uIiwiZGF0YSIsInN0YXR1cyIsIlNUQVRVU19BQ1RJVkUiLCJwYXVzZSIsImNsZWFySW50ZXJ2YWwiLCJ0b2tlbiIsInNldEludGVydmFsIiwic3RvcCIsIkRPQ19ISURERU4iLCJWSVNJQklMSVRZX0NIQU5HRV9FVkVOVCIsIlNUQVRVU19JRExFIiwiU1RBVFVTX0hJRERFTiIsIklFIiwidiIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwidW5kZWYiLCJkb2MiLCJWRVJTSU9OIiwidGltZXJzIiwiaWRsZVRpbWUiLCJpc0xlZ2FjeU1vZGVPbiIsInVuZGVmaW5lZCIsImhpZGRlbiIsIm1vekhpZGRlbiIsIm1zSGlkZGVuIiwid2Via2l0SGlkZGVuIiwibGVnYWN5TW9kZSIsInRyYWNrQ2hhbmdlIiwiYmx1ciIsImZvY3VzIiwic3RhcnRJZGxlVGltZXIiLCJ0cmFja0lkbGVTdGF0dXMiLCJCTFVSX0VWRU5UIiwiTW91c2VFdmVudCIsIm1vdmVtZW50WCIsIm1vdmVtZW50WSIsIm1hcCIsImNsZWFyVGltZW91dCIsImxlbmd0aCIsIndha2V1cCIsImlkbGVTdGFydGVkVGltZSIsIkRhdGUiLCJzZXRUaW1lb3V0IiwiaWRsZSIsIm5vdyIsInJlcyIsImlzSWRsZSIsImlkbGVGb3IiLCJ0aW1lTGVmdCIsInRpbWVMZWZ0UGVyIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJjaGVjayIsInNlbGYiLCJnbG9iYWwiLCJJZlZpc2libGUiXSwibWFwcGluZ3MiOiJDQUFBLFNBQTJDQSxFQUFNQyxHQUNoRCxHQUFzQixpQkFBWkMsU0FBMEMsaUJBQVhDLE9BQ3hDQSxPQUFPRCxRQUFVRCxTQUNiLEdBQXFCLG1CQUFYRyxRQUF5QkEsT0FBT0MsSUFDOUNELE9BQU8sR0FBSUgsT0FDUCxDQUNKLElBQUlLLEVBQUlMLElBQ1IsSUFBSSxJQUFJTSxLQUFLRCxHQUF1QixpQkFBWkosUUFBdUJBLFFBQVVGLEdBQU1PLEdBQUtELEVBQUVDLElBUHhF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QUNILFlBQWMvQixJQUFWK0IsRUFDS3JGLEtBQUs2QixTQUFXd0QsRUFFbEJyRixLQUFLNkIsU0FBVyxFQUFBQyxpQjs7Ozt5SEN2TzNCLGtEQUlNMUUsRUFBd0IsaUJBQVRrSSxNQUFxQkEsS0FBS0EsT0FBU0EsTUFBUUEsTUFDN0IsaUJBQVhDLEdBQXVCQSxFQUFPQSxTQUFXQSxHQUFVQSxHQUMzRHZGLEtBRUgsRUFBQXVCLFVBQVksSUFBSSxFQUFBaUUsVUFBVXBJLEVBQU11RixZIiwiZmlsZSI6ImlmdmlzaWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImV4cG9ydCBuYW1lc3BhY2UgRXZlbnRzIHtcbiAgY29uc3Qgc3RvcmUgPSB7fTtcbiAgbGV0IHNldExpc3RlbmVyOiBGdW5jdGlvbjtcblxuICBleHBvcnQgZnVuY3Rpb24gYXR0YWNoIChldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBpZiAoIXN0b3JlW2V2ZW50XSkge1xuICAgICAgc3RvcmVbZXZlbnRdID0gW107XG4gICAgfVxuICAgIHN0b3JlW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBmaXJlIChldmVudDogc3RyaW5nLCBhcmdzID0gW10pIHtcbiAgICBpZiAoc3RvcmVbZXZlbnRdKSB7XG4gICAgICBzdG9yZVtldmVudF0uZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICAgIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZSAoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGRlbGV0ZSBzdG9yZVtldmVudF07XG4gICAgfVxuICAgIGlmIChzdG9yZVtldmVudF0pIHtcbiAgICAgIHN0b3JlW2V2ZW50XSA9IHN0b3JlW2V2ZW50XS5maWx0ZXIoc2F2ZWRDYWxsYmFjayA9PiB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayAhPT0gc2F2ZWRDYWxsYmFjaztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBkb20gKGVsZW1lbnQ6IGFueSwgZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgaWYgKCFzZXRMaXN0ZW5lcikge1xuICAgICAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBzZXRMaXN0ZW5lciA9IChlbCwgZXYsIGZuKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGZuLCBmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LmF0dGFjaEV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNldExpc3RlbmVyID0gKGVsLCBldiwgZm4pID0+IHtcbiAgICAgICAgICByZXR1cm4gZWwuYXR0YWNoRXZlbnQoYG9uJHtldn1gLCBmbiwgZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0TGlzdGVuZXIgPSAoZWwsIGV2LCBmbikgPT4ge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXR1cm4tYXNzaWduLCBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgIHJldHVybiBlbFtgb24ke2V2fWBdID0gZm47XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZXRMaXN0ZW5lcihlbGVtZW50LCBldmVudCwgY2FsbGJhY2spO1xuICB9XG59XG5cbi8vIGV4cG9ydCBkZWZhdWx0IEV2ZW50cztcbiIsImltcG9ydCB7IElmVmlzaWJsZSwgU1RBVFVTX0FDVElWRSB9IGZyb20gJy4vaWZ2aXNpYmxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBwcml2YXRlIHRva2VuOiBudW1iZXI7XG5cbiAgc3RvcHBlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIGlmdmlzaWJsZTogSWZWaXNpYmxlLFxuICAgIHByaXZhdGUgc2Vjb25kczogbnVtYmVyLFxuICAgIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5zdGFydCgpO1xuXG4gICAgdGhpcy5pZnZpc2libGUub24oJ3N0YXR1c0NoYW5nZWQnLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICBpZiAodGhpcy5zdG9wcGVkID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09IFNUQVRVU19BQ1RJVkUpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0ICgpIHtcbiAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcbiAgICBjbGVhckludGVydmFsKHRoaXMudG9rZW4pO1xuICAgIHRoaXMudG9rZW4gPSBzZXRJbnRlcnZhbCh0aGlzLmNhbGxiYWNrLCB0aGlzLnNlY29uZHMgKiAxMDAwKTtcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRva2VuKTtcbiAgfVxuXG4gIHJlc3VtZSAoKSB7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudHMgfSBmcm9tICcuL0V2ZW50cyc7XG5pbXBvcnQgVGltZXIgZnJvbSAnLi9UaW1lcic7XG5cbmV4cG9ydCBjb25zdCBTVEFUVVNfQUNUSVZFID0gJ2FjdGl2ZSc7XG5leHBvcnQgY29uc3QgU1RBVFVTX0lETEUgPSAnaWRsZSc7XG5leHBvcnQgY29uc3QgU1RBVFVTX0hJRERFTiA9ICdoaWRkZW4nO1xuLy8gZGVjbGFyZSB2YXIgX19WRVJTSU9OX186IHN0cmluZztcbmxldCBET0NfSElEREVOOiBzdHJpbmc7XG5sZXQgVklTSUJJTElUWV9DSEFOR0VfRVZFTlQ6IHN0cmluZztcblxuZXhwb3J0IGludGVyZmFjZSBJSWRsZUluZm8ge1xuICBpc0lkbGU6IGJvb2xlYW47XG4gIGlkbGVGb3I6IG51bWJlcjtcbiAgdGltZUxlZnQ6IG51bWJlcjtcbiAgdGltZUxlZnRQZXI6IG51bWJlcjtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmV4cG9ydCBjb25zdCBJRSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCB1bmRlZjtcbiAgbGV0IHYgPSAzO1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbmQtYXNzaWduXG4gIHdoaWxlIChcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGx1c3BsdXMsIG5vLXNlcXVlbmNlc1xuICAgIGRpdi5pbm5lckhUTUwgPSBgPCEtLVtpZiBndCBJRSAkeysrdn1dPjxpPjwvaT48IVtlbmRpZl0tLT5gLFxuICAgIGFsbFswXVxuICApO1xuXG4gIHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcbn0oKSk7XG5cbmV4cG9ydCBjbGFzcyBJZlZpc2libGUge1xuICBzdGF0dXM6IHN0cmluZyA9IFNUQVRVU19BQ1RJVkU7XG5cbiAgVkVSU0lPTiA9ICcyLjAuMTEnO1xuXG4gIHByaXZhdGUgdGltZXJzOiBudW1iZXJbXSA9IFtdO1xuXG4gIHByaXZhdGUgaWRsZVRpbWU6IG51bWJlciA9IDMwMDAwO1xuXG4gIHByaXZhdGUgaWRsZVN0YXJ0ZWRUaW1lOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBpc0xlZ2FjeU1vZGVPbiA9IGZhbHNlO1xuXG5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgcm9vdCwgcHJpdmF0ZSBkb2MpIHtcbiAgICAvLyBGaW5kIGNvcnJlY3QgYnJvd3NlciBldmVudHNcbiAgICBpZiAodGhpcy5kb2MuaGlkZGVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIERPQ19ISURERU4gPSAnaGlkZGVuJztcbiAgICAgIFZJU0lCSUxJVFlfQ0hBTkdFX0VWRU5UID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kb2MubW96SGlkZGVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIERPQ19ISURERU4gPSAnbW96SGlkZGVuJztcbiAgICAgIFZJU0lCSUxJVFlfQ0hBTkdFX0VWRU5UID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kb2MubXNIaWRkZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgRE9DX0hJRERFTiA9ICdtc0hpZGRlbic7XG4gICAgICBWSVNJQklMSVRZX0NIQU5HRV9FVkVOVCA9ICdtc3Zpc2liaWxpdHljaGFuZ2UnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5kb2Mud2Via2l0SGlkZGVuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIERPQ19ISURERU4gPSAnd2Via2l0SGlkZGVuJztcbiAgICAgIFZJU0lCSUxJVFlfQ0hBTkdFX0VWRU5UID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xuICAgIH1cblxuICAgIGlmIChET0NfSElEREVOID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubGVnYWN5TW9kZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0cmFja0NoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZG9jW0RPQ19ISURERU5dKSB7XG4gICAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdHJhY2tDaGFuZ2UoKTsgLy8gZ2V0IGluaXRpYWwgc3RhdHVzXG4gICAgICBFdmVudHMuZG9tKHRoaXMuZG9jLCBWSVNJQklMSVRZX0NIQU5HRV9FVkVOVCwgdHJhY2tDaGFuZ2UpO1xuICAgIH1cbiAgICB0aGlzLnN0YXJ0SWRsZVRpbWVyKCk7XG4gICAgdGhpcy50cmFja0lkbGVTdGF0dXMoKTtcbiAgfVxuXG4gIGxlZ2FjeU1vZGUgKCkge1xuICAgIC8vIGl0J3MgYWxyZWFkeSBvblxuICAgIGlmICh0aGlzLmlzTGVnYWN5TW9kZU9uKSB7IHJldHVybjsgfVxuXG4gICAgbGV0IEJMVVJfRVZFTlQgPSAnYmx1cic7XG4gICAgY29uc3QgRk9DVVNfRVZFTlQgPSAnZm9jdXMnO1xuXG4gICAgaWYgKElFIDwgOSkge1xuICAgICAgQkxVUl9FVkVOVCA9ICdmb2N1c291dCc7XG4gICAgfVxuXG4gICAgRXZlbnRzLmRvbSh0aGlzLnJvb3QsIEJMVVJfRVZFTlQsICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmJsdXIoKTtcbiAgICB9KTtcblxuICAgIEV2ZW50cy5kb20odGhpcy5yb290LCBGT0NVU19FVkVOVCwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZm9jdXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXNMZWdhY3lNb2RlT24gPSB0cnVlO1xuICB9XG5cbiAgc3RhcnRJZGxlVGltZXIgKGV2ZW50PzogRXZlbnQpIHtcbiAgICAvLyBQcmV2ZW50cyBQaGFudG9tIGV2ZW50cy5cbiAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zZXJrYW55ZXJzZW4vaWZ2aXNpYmxlLmpzL3B1bGwvMzdcbiAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ICYmIGV2ZW50Lm1vdmVtZW50WCA9PT0gMCAmJiBldmVudC5tb3ZlbWVudFkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRpbWVycy5tYXAoY2xlYXJUaW1lb3V0KTtcbiAgICB0aGlzLnRpbWVycy5sZW5ndGggPSAwOyAvLyBjbGVhciB0aGUgYXJyYXlcblxuICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gU1RBVFVTX0lETEUpIHtcbiAgICAgIHRoaXMud2FrZXVwKCk7XG4gICAgfVxuXG4gICAgdGhpcy5pZGxlU3RhcnRlZFRpbWUgPSArKG5ldyBEYXRlKCkpO1xuXG4gICAgdGhpcy50aW1lcnMucHVzaChzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gU1RBVFVTX0FDVElWRSB8fCB0aGlzLnN0YXR1cyA9PT0gU1RBVFVTX0hJRERFTikge1xuICAgICAgICByZXR1cm4gdGhpcy5pZGxlKCk7XG4gICAgICB9XG4gICAgfSwgdGhpcy5pZGxlVGltZSkpO1xuICB9XG5cbiAgdHJhY2tJZGxlU3RhdHVzICgpIHtcbiAgICBFdmVudHMuZG9tKHRoaXMuZG9jLCAnbW91c2Vtb3ZlJywgdGhpcy5zdGFydElkbGVUaW1lci5iaW5kKHRoaXMpKTtcbiAgICBFdmVudHMuZG9tKHRoaXMuZG9jLCAnbW91c2Vkb3duJywgdGhpcy5zdGFydElkbGVUaW1lci5iaW5kKHRoaXMpKTtcbiAgICBFdmVudHMuZG9tKHRoaXMuZG9jLCAna2V5dXAnLCB0aGlzLnN0YXJ0SWRsZVRpbWVyLmJpbmQodGhpcykpO1xuICAgIEV2ZW50cy5kb20odGhpcy5kb2MsICd0b3VjaHN0YXJ0JywgdGhpcy5zdGFydElkbGVUaW1lci5iaW5kKHRoaXMpKTtcbiAgICBFdmVudHMuZG9tKHRoaXMucm9vdCwgJ3Njcm9sbCcsIHRoaXMuc3RhcnRJZGxlVGltZXIuYmluZCh0aGlzKSk7XG4gICAgLy8gV2hlbiBwYWdlIGlzIGZvY3VzIHdpdGhvdXQgYW55IGV2ZW50LCBpdCBzaG91bGQgbm90IGJlIGlkbGUuXG4gICAgdGhpcy5mb2N1cyh0aGlzLnN0YXJ0SWRsZVRpbWVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgb24gKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZGF0YTogYW55KSA9PiBhbnkpOiBJZlZpc2libGUge1xuICAgIEV2ZW50cy5hdHRhY2goZXZlbnQsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9mZiAoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s/OiBhbnkpOiBJZlZpc2libGUge1xuICAgIEV2ZW50cy5yZW1vdmUoZXZlbnQsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldElkbGVEdXJhdGlvbiAoc2Vjb25kczogbnVtYmVyKTogSWZWaXNpYmxlIHtcbiAgICB0aGlzLmlkbGVUaW1lID0gc2Vjb25kcyAqIDEwMDA7XG4gICAgdGhpcy5zdGFydElkbGVUaW1lcigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0SWRsZUR1cmF0aW9uICgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmlkbGVUaW1lO1xuICB9XG5cbiAgZ2V0SWRsZUluZm8gKCk6IElJZGxlSW5mbyB7XG4gICAgY29uc3Qgbm93ID0gKyhuZXcgRGF0ZSgpKTtcbiAgICBsZXQgcmVzOiBJSWRsZUluZm87XG4gICAgaWYgKHRoaXMuc3RhdHVzID09PSBTVEFUVVNfSURMRSkge1xuICAgICAgcmVzID0ge1xuICAgICAgICBpc0lkbGU6IHRydWUsXG4gICAgICAgIGlkbGVGb3I6IG5vdyAtIHRoaXMuaWRsZVN0YXJ0ZWRUaW1lLFxuICAgICAgICB0aW1lTGVmdDogMCxcbiAgICAgICAgdGltZUxlZnRQZXI6IDEwMCxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRpbWVMZWZ0ID0gKHRoaXMuaWRsZVN0YXJ0ZWRUaW1lICsgdGhpcy5pZGxlVGltZSkgLSBub3c7XG4gICAgICByZXMgPSB7XG4gICAgICAgIGlzSWRsZTogZmFsc2UsXG4gICAgICAgIGlkbGVGb3I6IG5vdyAtIHRoaXMuaWRsZVN0YXJ0ZWRUaW1lLFxuICAgICAgICB0aW1lTGVmdCxcbiAgICAgICAgdGltZUxlZnRQZXI6IHBhcnNlRmxvYXQoKDEwMCAtICh0aW1lTGVmdCAqIDEwMCAvIHRoaXMuaWRsZVRpbWUpKS50b0ZpeGVkKDIpKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBpZGxlIChjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IGFueSk6IElmVmlzaWJsZSB7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9uKCdpZGxlJywgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IFNUQVRVU19JRExFO1xuICAgICAgRXZlbnRzLmZpcmUoJ2lkbGUnKTtcbiAgICAgIEV2ZW50cy5maXJlKCdzdGF0dXNDaGFuZ2VkJywgW3sgc3RhdHVzOiB0aGlzLnN0YXR1cyB9XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYmx1ciAoY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiBhbnkpOiBJZlZpc2libGUge1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbignYmx1cicsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0dXMgPSBTVEFUVVNfSElEREVOO1xuICAgICAgRXZlbnRzLmZpcmUoJ2JsdXInKTtcbiAgICAgIEV2ZW50cy5maXJlKCdzdGF0dXNDaGFuZ2VkJywgW3sgc3RhdHVzOiB0aGlzLnN0YXR1cyB9XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9jdXMgKGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gYW55KTogSWZWaXNpYmxlIHtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMub24oJ2ZvY3VzJywgY2FsbGJhY2spO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMgIT09IFNUQVRVU19BQ1RJVkUpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gU1RBVFVTX0FDVElWRTtcbiAgICAgIEV2ZW50cy5maXJlKCdmb2N1cycpO1xuICAgICAgRXZlbnRzLmZpcmUoJ3dha2V1cCcpO1xuICAgICAgRXZlbnRzLmZpcmUoJ3N0YXR1c0NoYW5nZWQnLCBbeyBzdGF0dXM6IHRoaXMuc3RhdHVzIH1dKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3YWtldXAgKGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gYW55KTogSWZWaXNpYmxlIHtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMub24oJ3dha2V1cCcsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzICE9PSBTVEFUVVNfQUNUSVZFKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9IFNUQVRVU19BQ1RJVkU7XG4gICAgICBFdmVudHMuZmlyZSgnd2FrZXVwJyk7XG4gICAgICBFdmVudHMuZmlyZSgnc3RhdHVzQ2hhbmdlZCcsIFt7IHN0YXR1czogdGhpcy5zdGF0dXMgfV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9uRXZlcnkgKHNlY29uZHM6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogVGltZXIge1xuICAgIHJldHVybiBuZXcgVGltZXIodGhpcywgc2Vjb25kcywgY2FsbGJhY2spO1xuICB9XG5cbiAgbm93IChjaGVjaz86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChjaGVjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09IGNoZWNrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09IFNUQVRVU19BQ1RJVkU7XG4gIH1cbn1cbiIsImltcG9ydCB7IElmVmlzaWJsZSB9IGZyb20gJy4vaWZ2aXNpYmxlJztcblxuZGVjbGFyZSBsZXQgZ2xvYmFsOiBhbnk7XG4vLyBkZWNpZGUgYmV0d2VlbiBzZWxmIHZzIGdsb2JhbCBkZXBlbmRpbmcgb24gdGhlIGVudmlyb25tZW50XG5jb25zdCByb290ID0gKHR5cGVvZiBzZWxmID09PSAnb2JqZWN0JyAmJiBzZWxmLnNlbGYgPT09IHNlbGYgJiYgc2VsZilcbiAgICAgICAgICAgICB8fCAodHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsLmdsb2JhbCA9PT0gZ2xvYmFsICYmIGdsb2JhbClcbiAgICAgICAgICAgICB8fCB0aGlzO1xuXG5leHBvcnQgY29uc3QgaWZ2aXNpYmxlID0gbmV3IElmVmlzaWJsZShyb290LCBkb2N1bWVudCk7XG4iXSwic291cmNlUm9vdCI6IiJ9
window.idleCheckV2 = ifvisible;
