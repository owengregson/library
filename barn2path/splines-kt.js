(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports'], factory);
  else if (typeof exports === 'object')
    factory(module.exports);
  else
    root['splines-kt'] = factory(typeof this['splines-kt'] === 'undefined' ? {} : this['splines-kt']);
}(this, function (_) {
  'use strict';
  AbstractMutableCollection.prototype = Object.create(AbstractCollection.prototype);
  AbstractMutableCollection.prototype.constructor = AbstractMutableCollection;
  ListIteratorImpl.prototype = Object.create(IteratorImpl.prototype);
  ListIteratorImpl.prototype.constructor = ListIteratorImpl;
  AbstractMutableList.prototype = Object.create(AbstractMutableCollection.prototype);
  AbstractMutableList.prototype.constructor = AbstractMutableList;
  ArrayList.prototype = Object.create(AbstractMutableList.prototype);
  ArrayList.prototype.constructor = ArrayList;
  NodeJsOutput_0.prototype = Object.create(BaseOutput.prototype);
  NodeJsOutput_0.prototype.constructor = NodeJsOutput_0;
  BufferedOutput_0.prototype = Object.create(BaseOutput.prototype);
  BufferedOutput_0.prototype.constructor = BufferedOutput_0;
  BufferedOutputToConsoleLog_0.prototype = Object.create(BufferedOutput_0.prototype);
  BufferedOutputToConsoleLog_0.prototype.constructor = BufferedOutputToConsoleLog_0;
  PrimitiveKClassImpl.prototype = Object.create(KClassImpl.prototype);
  PrimitiveKClassImpl.prototype.constructor = PrimitiveKClassImpl;
  NothingKClassImpl.prototype = Object.create(KClassImpl.prototype);
  NothingKClassImpl.prototype.constructor = NothingKClassImpl;
  SimpleKClassImpl.prototype = Object.create(KClassImpl.prototype);
  SimpleKClassImpl.prototype.constructor = SimpleKClassImpl;
  Long.prototype = Object.create(Number_0.prototype);
  Long.prototype.constructor = Long;
  Exception.prototype = Object.create(Error.prototype);
  Exception.prototype.constructor = Exception;
  RuntimeException.prototype = Object.create(Exception.prototype);
  RuntimeException.prototype.constructor = RuntimeException;
  IllegalArgumentException.prototype = Object.create(RuntimeException.prototype);
  IllegalArgumentException.prototype.constructor = IllegalArgumentException;
  NoSuchElementException.prototype = Object.create(RuntimeException.prototype);
  NoSuchElementException.prototype.constructor = NoSuchElementException;
  UnsupportedOperationException.prototype = Object.create(RuntimeException.prototype);
  UnsupportedOperationException.prototype.constructor = UnsupportedOperationException;
  IndexOutOfBoundsException.prototype = Object.create(RuntimeException.prototype);
  IndexOutOfBoundsException.prototype.constructor = IndexOutOfBoundsException;
  NullPointerException.prototype = Object.create(RuntimeException.prototype);
  NullPointerException.prototype.constructor = NullPointerException;
  ClassCastException.prototype = Object.create(RuntimeException.prototype);
  ClassCastException.prototype.constructor = ClassCastException;
  QuinticHermiteSpline.prototype = Object.create(Spline.prototype);
  QuinticHermiteSpline.prototype.constructor = QuinticHermiteSpline;
  function joinToString(_this_, separator, prefix, postfix, limit, truncated, transform) {
    return joinTo(_this_, StringBuilder_init_$Create$(), separator, prefix, postfix, limit, truncated, transform).toString();
  }
  function joinToString$default(_this_, separator, prefix, postfix, limit, truncated, transform, $mask0, $handler) {
    if (!(($mask0 & 1) === 0))
      separator = ', ';
    if (!(($mask0 & 2) === 0))
      prefix = '';
    if (!(($mask0 & 4) === 0))
      postfix = '';
    if (!(($mask0 & 8) === 0))
      limit = -1;
    if (!(($mask0 & 16) === 0))
      truncated = '...';
    if (!(($mask0 & 32) === 0))
      transform = null;
    return joinToString(_this_, separator, prefix, postfix, limit, truncated, transform);
  }
  function joinTo(_this_, buffer, separator, prefix, postfix, limit, truncated, transform) {
    buffer.append_2(prefix);
    Unit_getInstance();
    var count = 0;
    var indexedObject = _this_;
    var inductionVariable = 0;
    var last_1 = indexedObject.length;
    $l$break: while (inductionVariable < last_1) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      count = count + 1 | 0;
      if (count > 1) {
        buffer.append_2(separator);
        Unit_getInstance();
      } else {
      }
      if (limit < 0 ? true : count <= limit) {
        appendElement(buffer, element, transform);
      } else
        break $l$break;
    }
    if (limit >= 0 ? count > limit : false) {
      buffer.append_2(truncated);
      Unit_getInstance();
    }buffer.append_2(postfix);
    Unit_getInstance();
    return buffer;
  }
  function drop(_this_, n) {
    var tmp0_require_0 = n >= 0;
    if (!tmp0_require_0) {
      var message_2 = '' + 'Requested element count ' + n + ' is less than zero.';
      throw IllegalArgumentException_init_$Create$(toString_0(message_2));
    }if (n === 0)
      return toList(_this_);
    var list;
    if (isInterface(_this_, Collection)) {
      var resultSize = _this_._get_size__7() - n | 0;
      if (resultSize <= 0)
        return emptyList();
      if (resultSize === 1)
        return listOf(last(_this_));
      list = ArrayList_init_$Create$_0(resultSize);
      if (isInterface(_this_, List)) {
        if (isInterface(_this_, RandomAccess)) {
          var inductionVariable = n;
          var last_1 = _this_._get_size__7();
          if (inductionVariable < last_1)
            do {
              var index = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              list.add_5(_this_.get_13(index));
              Unit_getInstance();
            }
             while (inductionVariable < last_1);
        } else {
          {
            var tmp1_iterator_0 = _this_.listIterator_2(n);
            var tmp1_iterator = tmp1_iterator_0;
            while (tmp1_iterator.hasNext_4()) {
              var item = tmp1_iterator.next_4();
              list.add_5(item);
              Unit_getInstance();
            }
          }
        }
        return list;
      } else {
      }
    } else {
      {
        list = ArrayList_init_$Create$();
      }
    }
    var count = 0;
    var tmp2_iterator = _this_.iterator_16();
    while (tmp2_iterator.hasNext_4()) {
      var item_0 = tmp2_iterator.next_4();
      if (count >= n) {
        list.add_5(item_0);
        Unit_getInstance();
      } else {
        count = count + 1 | 0;
        Unit_getInstance();
      }
    }
    return optimizeReadOnlyList(list);
  }
  function toList(_this_) {
    if (isInterface(_this_, Collection)) {
      var tmp0_subject = _this_._get_size__7();
      var tmp;
      switch (tmp0_subject) {
        case 0:
          tmp = emptyList();
          break;
        case 1:
          var tmp_0;
          if (isInterface(_this_, List)) {
            tmp_0 = _this_.get_13(0);
          } else {
            {
              tmp_0 = _this_.iterator_16().next_4();
            }
          }

          tmp = listOf(tmp_0);
          break;
        default:tmp = toMutableList(_this_);
          break;
      }
      return tmp;
    } else {
    }
    return optimizeReadOnlyList(toMutableList_0(_this_));
  }
  function last(_this_) {
    var tmp0_subject = _this_;
    if (isInterface(tmp0_subject, List))
      return last_0(_this_);
    else {
      {
        var iterator = _this_.iterator_16();
        if (!iterator.hasNext_4())
          throw NoSuchElementException_init_$Create$_0('Collection is empty.');
        var last_1 = iterator.next_4();
        while (iterator.hasNext_4())
          last_1 = iterator.next_4();
        return last_1;
      }
    }
  }
  function toMutableList(_this_) {
    return ArrayList_init_$Create$_1(_this_);
  }
  function toMutableList_0(_this_) {
    if (isInterface(_this_, Collection))
      return toMutableList(_this_);
    else {
    }
    return toCollection(_this_, ArrayList_init_$Create$());
  }
  function last_0(_this_) {
    if (_this_.isEmpty_6())
      throw NoSuchElementException_init_$Create$_0('List is empty.');
    return _this_.get_13(_get_lastIndex_(_this_));
  }
  function toCollection(_this_, destination) {
    var tmp0_iterator = _this_.iterator_16();
    while (tmp0_iterator.hasNext_4()) {
      var item = tmp0_iterator.next_4();
      destination.add_5(item);
      Unit_getInstance();
    }
    return destination;
  }
  function joinToString_0(_this_, separator, prefix, postfix, limit, truncated, transform) {
    return joinTo_0(_this_, StringBuilder_init_$Create$(), separator, prefix, postfix, limit, truncated, transform).toString();
  }
  function joinToString$default_0(_this_, separator, prefix, postfix, limit, truncated, transform, $mask0, $handler) {
    if (!(($mask0 & 1) === 0))
      separator = ', ';
    if (!(($mask0 & 2) === 0))
      prefix = '';
    if (!(($mask0 & 4) === 0))
      postfix = '';
    if (!(($mask0 & 8) === 0))
      limit = -1;
    if (!(($mask0 & 16) === 0))
      truncated = '...';
    if (!(($mask0 & 32) === 0))
      transform = null;
    return joinToString_0(_this_, separator, prefix, postfix, limit, truncated, transform);
  }
  function joinTo_0(_this_, buffer, separator, prefix, postfix, limit, truncated, transform) {
    buffer.append_2(prefix);
    Unit_getInstance();
    var count = 0;
    var tmp0_iterator = _this_.iterator_16();
    $l$break: while (tmp0_iterator.hasNext_4()) {
      var element = tmp0_iterator.next_4();
      count = count + 1 | 0;
      if (count > 1) {
        buffer.append_2(separator);
        Unit_getInstance();
      } else {
      }
      if (limit < 0 ? true : count <= limit) {
        appendElement(buffer, element, transform);
      } else
        break $l$break;
    }
    if (limit >= 0 ? count > limit : false) {
      buffer.append_2(truncated);
      Unit_getInstance();
    }buffer.append_2(postfix);
    Unit_getInstance();
    return buffer;
  }
  function _no_name_provided_(this$0) {
    this._this$0 = this$0;
  }
  _no_name_provided_.prototype.invoke = function (it) {
    return it === this._this$0 ? '(this Collection)' : toString(it);
  };
  _no_name_provided_.prototype.invoke_42 = function (p1) {
    return this.invoke((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided_.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function AbstractCollection() {
  }
  AbstractCollection.prototype.isEmpty_6 = function () {
    return this._get_size__7() === 0;
  };
  AbstractCollection.prototype.toString = function () {
    return joinToString$default_0(this, ', ', '[', ']', 0, null, _no_name_provided_$factory(this), 24, null);
  };
  AbstractCollection.prototype.toArray = function () {
    return copyToArrayImpl_0(this);
  };
  AbstractCollection.$metadata$ = {
    simpleName: 'AbstractCollection',
    kind: 'class',
    interfaces: [Collection]
  };
  function _no_name_provided_$factory(this$0) {
    var i = new _no_name_provided_(this$0);
    return function (p1) {
      return i.invoke(p1);
    };
  }
  function Companion_0() {
    Companion_instance = this;
  }
  Companion_0.prototype.checkElementIndex = function (index, size) {
    if (index < 0 ? true : index >= size) {
      throw IndexOutOfBoundsException_init_$Create$('' + 'index: ' + index + ', size: ' + size);
    }};
  Companion_0.prototype.checkPositionIndex = function (index, size) {
    if (index < 0 ? true : index > size) {
      throw IndexOutOfBoundsException_init_$Create$('' + 'index: ' + index + ', size: ' + size);
    }};
  Companion_0.prototype.checkBoundsIndexes = function (startIndex, endIndex, size) {
    if (startIndex < 0 ? true : endIndex > size) {
      throw IndexOutOfBoundsException_init_$Create$('' + 'startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
    }if (startIndex > endIndex) {
      throw IllegalArgumentException_init_$Create$('' + 'startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
    }};
  Companion_0.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion_0();
    return Companion_instance;
  }
  function _get_lastIndex_(_this_) {
    return _this_._get_size__7() - 1 | 0;
  }
  function emptyList() {
    return EmptyList_getInstance();
  }
  function optimizeReadOnlyList(_this_) {
    var tmp0_subject = _this_._get_size__7();
    switch (tmp0_subject) {
      case 0:
        return emptyList();
      case 1:
        return listOf(_this_.get_13(0));
      default:return _this_;
    }
  }
  function EmptyList() {
    EmptyList_instance = this;
    this._serialVersionUID = new Long(-1478467534, -1720727600);
  }
  EmptyList.prototype.toString = function () {
    return '[]';
  };
  EmptyList.prototype._get_size__7 = function () {
    return 0;
  };
  EmptyList.prototype.isEmpty_6 = function () {
    return true;
  };
  EmptyList.prototype.get_13 = function (index) {
    throw IndexOutOfBoundsException_init_$Create$('' + "Empty list doesn't contain element at index " + index + '.');
  };
  EmptyList.prototype.iterator_16 = function () {
    return EmptyIterator_getInstance();
  };
  EmptyList.prototype.listIterator_2 = function (index) {
    if (!(index === 0))
      throw IndexOutOfBoundsException_init_$Create$('' + 'Index: ' + index);
    return EmptyIterator_getInstance();
  };
  EmptyList.$metadata$ = {
    simpleName: 'EmptyList',
    kind: 'object',
    interfaces: [List, Serializable, RandomAccess]
  };
  var EmptyList_instance;
  function EmptyList_getInstance() {
    if (EmptyList_instance == null)
      new EmptyList();
    return EmptyList_instance;
  }
  function EmptyIterator() {
    EmptyIterator_instance = this;
  }
  EmptyIterator.prototype.hasNext_4 = function () {
    return false;
  };
  EmptyIterator.prototype.next_4 = function () {
    throw NoSuchElementException_init_$Create$();
  };
  EmptyIterator.$metadata$ = {
    simpleName: 'EmptyIterator',
    kind: 'object',
    interfaces: [ListIterator]
  };
  var EmptyIterator_instance;
  function EmptyIterator_getInstance() {
    if (EmptyIterator_instance == null)
      new EmptyIterator();
    return EmptyIterator_instance;
  }
  function arrayListOf(elements) {
    return elements.length === 0 ? ArrayList_init_$Create$() : ArrayList_init_$Create$_1(new ArrayAsCollection(elements, true));
  }
  function ArrayAsCollection(values, isVarargs) {
    this._values = values;
    this._isVarargs = isVarargs;
  }
  ArrayAsCollection.prototype._get_size__7 = function () {
    return this._values.length;
  };
  ArrayAsCollection.prototype.isEmpty_6 = function () {
    var tmp0_isEmpty_0 = this._values;
    return tmp0_isEmpty_0.length === 0;
  };
  ArrayAsCollection.prototype.iterator_16 = function () {
    return arrayIterator(this._values);
  };
  ArrayAsCollection.$metadata$ = {
    simpleName: 'ArrayAsCollection',
    kind: 'class',
    interfaces: [Collection]
  };
  function KClassifier() {
  }
  KClassifier.$metadata$ = {
    simpleName: 'KClassifier',
    kind: 'interface',
    interfaces: []
  };
  function appendElement(_this_, element, transform) {
    if (!(transform == null)) {
      _this_.append_2(transform(element));
      Unit_getInstance();
    } else {
      if (element == null ? true : isCharSequence(element)) {
        _this_.append_2(element);
        Unit_getInstance();
      } else {
        if (element instanceof Char) {
          _this_.append_1(element);
          Unit_getInstance();
        } else {
          {
            _this_.append_2(toString(element));
            Unit_getInstance();
          }
        }
      }
    }
  }
  function CharSequence() {
  }
  CharSequence.$metadata$ = {
    simpleName: 'CharSequence',
    kind: 'interface',
    interfaces: []
  };
  function Comparable() {
  }
  Comparable.$metadata$ = {
    simpleName: 'Comparable',
    kind: 'interface',
    interfaces: []
  };
  function Iterator() {
  }
  Iterator.$metadata$ = {
    simpleName: 'Iterator',
    kind: 'interface',
    interfaces: []
  };
  function MutableIterator() {
  }
  MutableIterator.$metadata$ = {
    simpleName: 'MutableIterator',
    kind: 'interface',
    interfaces: [Iterator]
  };
  function ListIterator() {
  }
  ListIterator.$metadata$ = {
    simpleName: 'ListIterator',
    kind: 'interface',
    interfaces: [Iterator]
  };
  function MutableListIterator() {
  }
  MutableListIterator.$metadata$ = {
    simpleName: 'MutableListIterator',
    kind: 'interface',
    interfaces: [ListIterator, MutableIterator]
  };
  function Number_0() {
  }
  Number_0.$metadata$ = {
    simpleName: 'Number',
    kind: 'class',
    interfaces: []
  };
  function Unit() {
    Unit_instance = this;
  }
  Unit.prototype.toString = function () {
    return 'kotlin.Unit';
  };
  Unit.$metadata$ = {
    simpleName: 'Unit',
    kind: 'object',
    interfaces: []
  };
  var Unit_instance;
  function Unit_getInstance() {
    if (Unit_instance == null)
      new Unit();
    return Unit_instance;
  }
  function DoubleCompanionObject_0() {
    DoubleCompanionObject_instance = this;
    this._MIN_VALUE = 4.9E-324;
    this._MAX_VALUE = 1.7976931348623157E308;
    this._POSITIVE_INFINITY = Infinity;
    this._NEGATIVE_INFINITY = -Infinity;
    this._NaN = NaN;
    this._SIZE_BYTES = 8;
    this._SIZE_BITS = 64;
  }
  DoubleCompanionObject_0.prototype._get_MIN_VALUE_ = function () {
    return this._MIN_VALUE;
  };
  DoubleCompanionObject_0.prototype._get_MAX_VALUE_ = function () {
    return this._MAX_VALUE;
  };
  DoubleCompanionObject_0.prototype._get_POSITIVE_INFINITY_ = function () {
    return this._POSITIVE_INFINITY;
  };
  DoubleCompanionObject_0.prototype._get_NEGATIVE_INFINITY_ = function () {
    return this._NEGATIVE_INFINITY;
  };
  DoubleCompanionObject_0.prototype._get_NaN_ = function () {
    return this._NaN;
  };
  DoubleCompanionObject_0.prototype._get_SIZE_BYTES_ = function () {
    return this._SIZE_BYTES;
  };
  DoubleCompanionObject_0.prototype._get_SIZE_BITS_ = function () {
    return this._SIZE_BITS;
  };
  DoubleCompanionObject_0.$metadata$ = {
    simpleName: 'DoubleCompanionObject',
    kind: 'object',
    interfaces: []
  };
  Object.defineProperty(DoubleCompanionObject_0.prototype, 'MIN_VALUE', {
    configurable: true,
    get: DoubleCompanionObject_0.prototype._get_MIN_VALUE_
  });
  Object.defineProperty(DoubleCompanionObject_0.prototype, 'MAX_VALUE', {
    configurable: true,
    get: DoubleCompanionObject_0.prototype._get_MAX_VALUE_
  });
  Object.defineProperty(DoubleCompanionObject_0.prototype, 'POSITIVE_INFINITY', {
    configurable: true,
    get: DoubleCompanionObject_0.prototype._get_POSITIVE_INFINITY_
  });
  Object.defineProperty(DoubleCompanionObject_0.prototype, 'NEGATIVE_INFINITY', {
    configurable: true,
    get: DoubleCompanionObject_0.prototype._get_NEGATIVE_INFINITY_
  });
  Object.defineProperty(DoubleCompanionObject_0.prototype, 'NaN', {
    configurable: true,
    get: DoubleCompanionObject_0.prototype._get_NaN_
  });
  Object.defineProperty(DoubleCompanionObject_0.prototype, 'SIZE_BYTES', {
    configurable: true,
    get: DoubleCompanionObject_0.prototype._get_SIZE_BYTES_
  });
  Object.defineProperty(DoubleCompanionObject_0.prototype, 'SIZE_BITS', {
    configurable: true,
    get: DoubleCompanionObject_0.prototype._get_SIZE_BITS_
  });
  var DoubleCompanionObject_instance;
  function DoubleCompanionObject_getInstance() {
    if (DoubleCompanionObject_instance == null)
      new DoubleCompanionObject_0();
    return DoubleCompanionObject_instance;
  }
  function listOf(element) {
    return arrayListOf([element]);
  }
  function copyToArray_0(collection) {
    var tmp;
    if (collection.toArray !== undefined) {
      var tmp0_unsafeCast_0 = collection.toArray();
      tmp = tmp0_unsafeCast_0;
    } else {
      {
        var tmp1_unsafeCast_0 = copyToArrayImpl_0(collection);
        tmp = tmp1_unsafeCast_0;
      }
    }
    return tmp;
  }
  function copyToArrayImpl_0(collection) {
    var array = [];
    var iterator = collection.iterator_16();
    while (iterator.hasNext_4()) {
      array.push(iterator.next_4());
    }
    return array;
  }
  function AbstractMutableCollection() {
    AbstractCollection.call(this);
  }
  AbstractMutableCollection.prototype.addAll_2 = function (elements) {
    this.checkIsMutable_1();
    var modified = false;
    var tmp0_iterator = elements.iterator_16();
    while (tmp0_iterator.hasNext_4()) {
      var element = tmp0_iterator.next_4();
      if (this.add_5(element))
        modified = true;
    }
    return modified;
  };
  AbstractMutableCollection.prototype.toJSON = function () {
    return this.toArray();
  };
  AbstractMutableCollection.prototype.checkIsMutable_1 = function () {
  };
  AbstractMutableCollection.$metadata$ = {
    simpleName: 'AbstractMutableCollection',
    kind: 'class',
    interfaces: [MutableCollection]
  };
  function IteratorImpl($outer) {
    this._$this = $outer;
    this._index = 0;
    this._last = -1;
  }
  IteratorImpl.prototype._set_index__0 = function (_set___) {
    this._index = _set___;
  };
  IteratorImpl.prototype.hasNext_4 = function () {
    return this._index < this._$this._get_size__7();
  };
  IteratorImpl.prototype.next_4 = function () {
    if (!this.hasNext_4())
      throw NoSuchElementException_init_$Create$();
    var tmp = this;
    var tmp0_this = this;
    var tmp1 = tmp0_this._index;
    tmp0_this._index = tmp1 + 1 | 0;
    tmp._last = tmp1;
    return this._$this.get_13(this._last);
  };
  IteratorImpl.$metadata$ = {
    simpleName: 'IteratorImpl',
    kind: 'class',
    interfaces: [MutableIterator]
  };
  function ListIteratorImpl($outer, index) {
    this._$this_0 = $outer;
    IteratorImpl.call(this, $outer);
    Companion_getInstance().checkPositionIndex(index, this._$this_0._get_size__7());
    this._set_index__0(index);
  }
  ListIteratorImpl.$metadata$ = {
    simpleName: 'ListIteratorImpl',
    kind: 'class',
    interfaces: [MutableListIterator]
  };
  function AbstractMutableList() {
    AbstractMutableCollection.call(this);
    this._modCount = 0;
  }
  AbstractMutableList.prototype._set_modCount__0 = function (_set___) {
    this._modCount = _set___;
  };
  AbstractMutableList.prototype._get_modCount__0 = function () {
    return this._modCount;
  };
  AbstractMutableList.prototype.add_5 = function (element) {
    this.checkIsMutable_1();
    this.add_3(this._get_size__7(), element);
    return true;
  };
  AbstractMutableList.prototype.iterator_16 = function () {
    return new IteratorImpl(this);
  };
  AbstractMutableList.prototype.listIterator_2 = function (index) {
    return new ListIteratorImpl(this, index);
  };
  AbstractMutableList.$metadata$ = {
    simpleName: 'AbstractMutableList',
    kind: 'class',
    interfaces: [MutableList]
  };
  function ArrayList_init_$Init$($this) {
    ArrayList.call($this, []);
    return $this;
  }
  function ArrayList_init_$Create$() {
    return ArrayList_init_$Init$(Object.create(ArrayList.prototype));
  }
  function ArrayList_init_$Init$_0(initialCapacity, $this) {
    ArrayList.call($this, []);
    return $this;
  }
  function ArrayList_init_$Create$_0(initialCapacity) {
    return ArrayList_init_$Init$_0(initialCapacity, Object.create(ArrayList.prototype));
  }
  function ArrayList_init_$Init$_1(elements, $this) {
    ArrayList.call($this, copyToArray_0(elements));
    return $this;
  }
  function ArrayList_init_$Create$_1(elements) {
    return ArrayList_init_$Init$_1(elements, Object.create(ArrayList.prototype));
  }
  function rangeCheck($this, index) {
    Companion_getInstance().checkElementIndex(index, $this._get_size__7());
    return index;
  }
  function insertionRangeCheck($this, index) {
    Companion_getInstance().checkPositionIndex(index, $this._get_size__7());
    return index;
  }
  function ArrayList(array) {
    AbstractMutableList.call(this);
    this._array = array;
    this._isReadOnly = false;
  }
  ArrayList.prototype._get_size__7 = function () {
    return this._array.length;
  };
  ArrayList.prototype.get_13 = function (index) {
    var tmp = this._array[rangeCheck(this, index)];
    return (tmp == null ? true : isObject(tmp)) ? tmp : THROW_CCE();
  };
  ArrayList.prototype.set_1 = function (index, element) {
    this.checkIsMutable_1();
    rangeCheck(this, index);
    Unit_getInstance();
    var tmp0_apply_0 = this._array[index];
    this._array[index] = element;
    var tmp = tmp0_apply_0;
    return (tmp == null ? true : isObject(tmp)) ? tmp : THROW_CCE();
  };
  ArrayList.prototype.add_5 = function (element) {
    this.checkIsMutable_1();
    var tmp0_asDynamic_0 = this._array;
    tmp0_asDynamic_0.push(element);
    var tmp0_this = this;
    var tmp1 = tmp0_this._get_modCount__0();
    tmp0_this._set_modCount__0(tmp1 + 1 | 0);
    Unit_getInstance();
    return true;
  };
  ArrayList.prototype.add_3 = function (index, element) {
    this.checkIsMutable_1();
    var tmp0_asDynamic_0 = this._array;
    tmp0_asDynamic_0.splice(insertionRangeCheck(this, index), 0, element);
    var tmp0_this = this;
    var tmp1 = tmp0_this._get_modCount__0();
    tmp0_this._set_modCount__0(tmp1 + 1 | 0);
    Unit_getInstance();
  };
  ArrayList.prototype.addAll_2 = function (elements) {
    this.checkIsMutable_1();
    if (elements.isEmpty_6())
      return false;
    var tmp0_this = this;
    var tmp = tmp0_this;
    var tmp0_plus_0 = tmp0_this._array;
    var tmp1_plus_0 = copyToArray_0(elements);
    tmp._array = tmp0_plus_0.concat(tmp1_plus_0);
    var tmp1_this = this;
    var tmp2 = tmp1_this._get_modCount__0();
    tmp1_this._set_modCount__0(tmp2 + 1 | 0);
    Unit_getInstance();
    return true;
  };
  ArrayList.prototype.toString = function () {
    return arrayToString(this._array);
  };
  ArrayList.prototype.toArray_0 = function () {
    return [].slice.call(this._array);
  };
  ArrayList.prototype.toArray = function () {
    return this.toArray_0();
  };
  ArrayList.prototype.checkIsMutable_1 = function () {
    if (this._isReadOnly)
      throw UnsupportedOperationException_init_$Create$();
  };
  ArrayList.$metadata$ = {
    simpleName: 'ArrayList',
    kind: 'class',
    interfaces: [MutableList, RandomAccess]
  };
  function RandomAccess() {
  }
  RandomAccess.$metadata$ = {
    simpleName: 'RandomAccess',
    kind: 'interface',
    interfaces: []
  };
  var output;
  function BaseOutput() {
  }
  BaseOutput.prototype.println_5 = function () {
    this.print_2('\n');
  };
  BaseOutput.prototype.println_6 = function (message) {
    this.print_2(message);
    this.println_5();
  };
  BaseOutput.$metadata$ = {
    simpleName: 'BaseOutput',
    kind: 'class',
    interfaces: []
  };
  function NodeJsOutput_0(outputStream) {
    BaseOutput.call(this);
    this._outputStream = outputStream;
  }
  NodeJsOutput_0.prototype.print_2 = function (message) {
    var messageString = String(message);
    this._outputStream.write(messageString);
  };
  NodeJsOutput_0.$metadata$ = {
    simpleName: 'NodeJsOutput',
    kind: 'class',
    interfaces: []
  };
  function BufferedOutputToConsoleLog_0() {
    BufferedOutput_0.call(this);
  }
  BufferedOutputToConsoleLog_0.prototype.print_2 = function (message) {
    var s = String(message);
    var tmp0_nativeLastIndexOf_0 = s;
    var tmp1_nativeLastIndexOf_0 = '\n';
    var tmp2_nativeLastIndexOf_0 = 0;
    var i = tmp0_nativeLastIndexOf_0.lastIndexOf(tmp1_nativeLastIndexOf_0, tmp2_nativeLastIndexOf_0);
    if (i >= 0) {
      var tmp0_this = this;
      var tmp = tmp0_this._get_buffer__0();
      var tmp3_substring_0 = s;
      var tmp4_substring_0 = 0;
      tmp0_this._set_buffer__0(tmp + tmp3_substring_0.substring(tmp4_substring_0, i));
      this.flush();
      var tmp5_substring_0 = s;
      var tmp6_substring_0 = i + 1 | 0;
      s = tmp5_substring_0.substring(tmp6_substring_0);
    }var tmp1_this = this;
    tmp1_this._set_buffer__0(tmp1_this._get_buffer__0() + s);
  };
  BufferedOutputToConsoleLog_0.prototype.flush = function () {
    (function () {
      var $externalVarargReceiverTmp = console;
      return $externalVarargReceiverTmp.log.apply($externalVarargReceiverTmp, [].concat([this._get_buffer__0()]));
    }.call(this));
    this._set_buffer__0('');
  };
  BufferedOutputToConsoleLog_0.$metadata$ = {
    simpleName: 'BufferedOutputToConsoleLog',
    kind: 'class',
    interfaces: []
  };
  function BufferedOutput_0() {
    BaseOutput.call(this);
    this._buffer = '';
  }
  BufferedOutput_0.prototype._set_buffer__0 = function (_set___) {
    this._buffer = _set___;
  };
  BufferedOutput_0.prototype._get_buffer__0 = function () {
    return this._buffer;
  };
  BufferedOutput_0.prototype.print_2 = function (message) {
    var tmp0_this = this;
    var tmp = tmp0_this;
    var tmp_0 = tmp0_this._buffer;
    tmp._buffer = tmp_0 + String(message);
  };
  BufferedOutput_0.$metadata$ = {
    simpleName: 'BufferedOutput',
    kind: 'class',
    interfaces: []
  };
  function println(message) {
    output.println_6(message);
  }
  function output$init$() {
    var isNode_2 = typeof process !== 'undefined' && process.versions && !!process.versions.node;
    return isNode_2 ? new NodeJsOutput_0(process.stdout) : new BufferedOutputToConsoleLog_0();
  }
  function Serializable() {
  }
  Serializable.$metadata$ = {
    simpleName: 'Serializable',
    kind: 'interface',
    interfaces: []
  };
  function isNaN_0(_this_) {
    return !(_this_ === _this_);
  }
  function _get_js_(_this_) {
    return (_this_ instanceof KClassImpl ? _this_ : THROW_CCE())._get_jClass__2();
  }
  function KClass() {
  }
  KClass.$metadata$ = {
    simpleName: 'KClass',
    kind: 'interface',
    interfaces: [KClassifier]
  };
  function KClassImpl(jClass) {
    this._jClass = jClass;
  }
  KClassImpl.prototype._get_jClass__2 = function () {
    return this._jClass;
  };
  KClassImpl.prototype.toString = function () {
    return '' + 'class ' + this._get_simpleName__2();
  };
  KClassImpl.$metadata$ = {
    simpleName: 'KClassImpl',
    kind: 'class',
    interfaces: [KClass]
  };
  function PrimitiveKClassImpl(jClass, givenSimpleName, isInstanceFunction) {
    KClassImpl.call(this, jClass);
    this._givenSimpleName = givenSimpleName;
    this._isInstanceFunction = isInstanceFunction;
  }
  PrimitiveKClassImpl.prototype._get_simpleName__2 = function () {
    return this._givenSimpleName;
  };
  PrimitiveKClassImpl.$metadata$ = {
    simpleName: 'PrimitiveKClassImpl',
    kind: 'class',
    interfaces: []
  };
  function NothingKClassImpl() {
    NothingKClassImpl_instance = this;
    KClassImpl.call(this, Object);
    this._simpleName = 'Nothing';
  }
  NothingKClassImpl.prototype._get_simpleName__2 = function () {
    return this._simpleName;
  };
  NothingKClassImpl.prototype._get_jClass__2 = function () {
    throw UnsupportedOperationException_init_$Create$_0("There's no native JS class for Nothing type");
  };
  NothingKClassImpl.$metadata$ = {
    simpleName: 'NothingKClassImpl',
    kind: 'object',
    interfaces: []
  };
  var NothingKClassImpl_instance;
  function NothingKClassImpl_getInstance() {
    if (NothingKClassImpl_instance == null)
      new NothingKClassImpl();
    return NothingKClassImpl_instance;
  }
  function ErrorKClass() {
  }
  ErrorKClass.$metadata$ = {
    simpleName: 'ErrorKClass',
    kind: 'class',
    interfaces: [KClass]
  };
  function SimpleKClassImpl(jClass) {
    KClassImpl.call(this, jClass);
    var tmp = this;
    var tmp0_safe_receiver = jClass.$metadata$;
    var tmp0_unsafeCast_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.simpleName;
    tmp._simpleName_0 = tmp0_unsafeCast_0;
  }
  SimpleKClassImpl.prototype._get_simpleName__2 = function () {
    return this._simpleName_0;
  };
  SimpleKClassImpl.$metadata$ = {
    simpleName: 'SimpleKClassImpl',
    kind: 'class',
    interfaces: []
  };
  var functionClasses;
  function _no_name_provided__0() {
  }
  _no_name_provided__0.prototype.invoke_41 = function (it) {
    return isObject(it);
  };
  _no_name_provided__0.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__0.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__1() {
  }
  _no_name_provided__1.prototype.invoke_41 = function (it) {
    return isNumber(it);
  };
  _no_name_provided__1.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__1.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__2() {
  }
  _no_name_provided__2.prototype.invoke_41 = function (it) {
    return !(it == null) ? typeof it === 'boolean' : false;
  };
  _no_name_provided__2.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__2.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__3() {
  }
  _no_name_provided__3.prototype.invoke_41 = function (it) {
    return !(it == null) ? typeof it === 'number' : false;
  };
  _no_name_provided__3.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__3.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__4() {
  }
  _no_name_provided__4.prototype.invoke_41 = function (it) {
    return !(it == null) ? typeof it === 'number' : false;
  };
  _no_name_provided__4.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__4.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__5() {
  }
  _no_name_provided__5.prototype.invoke_41 = function (it) {
    return !(it == null) ? typeof it === 'number' : false;
  };
  _no_name_provided__5.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__5.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__6() {
  }
  _no_name_provided__6.prototype.invoke_41 = function (it) {
    return !(it == null) ? typeof it === 'number' : false;
  };
  _no_name_provided__6.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__6.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__7() {
  }
  _no_name_provided__7.prototype.invoke_41 = function (it) {
    return !(it == null) ? typeof it === 'number' : false;
  };
  _no_name_provided__7.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__7.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__8() {
  }
  _no_name_provided__8.prototype.invoke_41 = function (it) {
    return !(it == null) ? isArray(it) : false;
  };
  _no_name_provided__8.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__8.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__9() {
  }
  _no_name_provided__9.prototype.invoke_41 = function (it) {
    return !(it == null) ? typeof it === 'string' : false;
  };
  _no_name_provided__9.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__9.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__10() {
  }
  _no_name_provided__10.prototype.invoke_41 = function (it) {
    return it instanceof Error;
  };
  _no_name_provided__10.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__10.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__11() {
  }
  _no_name_provided__11.prototype.invoke_41 = function (it) {
    return !(it == null) ? isBooleanArray(it) : false;
  };
  _no_name_provided__11.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__11.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__12() {
  }
  _no_name_provided__12.prototype.invoke_41 = function (it) {
    return !(it == null) ? isCharArray(it) : false;
  };
  _no_name_provided__12.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__12.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__13() {
  }
  _no_name_provided__13.prototype.invoke_41 = function (it) {
    return !(it == null) ? isByteArray(it) : false;
  };
  _no_name_provided__13.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__13.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__14() {
  }
  _no_name_provided__14.prototype.invoke_41 = function (it) {
    return !(it == null) ? isShortArray(it) : false;
  };
  _no_name_provided__14.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__14.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__15() {
  }
  _no_name_provided__15.prototype.invoke_41 = function (it) {
    return !(it == null) ? isIntArray(it) : false;
  };
  _no_name_provided__15.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__15.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__16() {
  }
  _no_name_provided__16.prototype.invoke_41 = function (it) {
    return !(it == null) ? isLongArray(it) : false;
  };
  _no_name_provided__16.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__16.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__17() {
  }
  _no_name_provided__17.prototype.invoke_41 = function (it) {
    return !(it == null) ? isFloatArray(it) : false;
  };
  _no_name_provided__17.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__17.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__18() {
  }
  _no_name_provided__18.prototype.invoke_41 = function (it) {
    return !(it == null) ? isDoubleArray(it) : false;
  };
  _no_name_provided__18.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__18.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided__19($arity) {
    this._$arity = $arity;
  }
  _no_name_provided__19.prototype.invoke_41 = function (it) {
    var tmp;
    if (typeof it === 'function') {
      tmp = it.length === this._$arity;
    } else {
      tmp = false;
    }
    return tmp;
  };
  _no_name_provided__19.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__19.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function PrimitiveClasses_0() {
    PrimitiveClasses_instance = this;
    var tmp = this;
    var tmp0_unsafeCast_0 = Object;
    var tmp_0 = tmp0_unsafeCast_0;
    tmp._anyClass = new PrimitiveKClassImpl(tmp_0, 'Any', _no_name_provided_$factory_0());
    var tmp_1 = this;
    var tmp0_unsafeCast_0_0 = Number;
    var tmp_2 = tmp0_unsafeCast_0_0;
    tmp_1._numberClass = new PrimitiveKClassImpl(tmp_2, 'Number', _no_name_provided_$factory_1());
    this._nothingClass = NothingKClassImpl_getInstance();
    var tmp_3 = this;
    var tmp0_unsafeCast_0_1 = Boolean;
    var tmp_4 = tmp0_unsafeCast_0_1;
    tmp_3._booleanClass = new PrimitiveKClassImpl(tmp_4, 'Boolean', _no_name_provided_$factory_2());
    var tmp_5 = this;
    var tmp0_unsafeCast_0_2 = Number;
    var tmp_6 = tmp0_unsafeCast_0_2;
    tmp_5._byteClass = new PrimitiveKClassImpl(tmp_6, 'Byte', _no_name_provided_$factory_3());
    var tmp_7 = this;
    var tmp0_unsafeCast_0_3 = Number;
    var tmp_8 = tmp0_unsafeCast_0_3;
    tmp_7._shortClass = new PrimitiveKClassImpl(tmp_8, 'Short', _no_name_provided_$factory_4());
    var tmp_9 = this;
    var tmp0_unsafeCast_0_4 = Number;
    var tmp_10 = tmp0_unsafeCast_0_4;
    tmp_9._intClass = new PrimitiveKClassImpl(tmp_10, 'Int', _no_name_provided_$factory_5());
    var tmp_11 = this;
    var tmp0_unsafeCast_0_5 = Number;
    var tmp_12 = tmp0_unsafeCast_0_5;
    tmp_11._floatClass = new PrimitiveKClassImpl(tmp_12, 'Float', _no_name_provided_$factory_6());
    var tmp_13 = this;
    var tmp0_unsafeCast_0_6 = Number;
    var tmp_14 = tmp0_unsafeCast_0_6;
    tmp_13._doubleClass = new PrimitiveKClassImpl(tmp_14, 'Double', _no_name_provided_$factory_7());
    var tmp_15 = this;
    var tmp0_unsafeCast_0_7 = Array;
    var tmp_16 = tmp0_unsafeCast_0_7;
    tmp_15._arrayClass = new PrimitiveKClassImpl(tmp_16, 'Array', _no_name_provided_$factory_8());
    var tmp_17 = this;
    var tmp0_unsafeCast_0_8 = String;
    var tmp_18 = tmp0_unsafeCast_0_8;
    tmp_17._stringClass = new PrimitiveKClassImpl(tmp_18, 'String', _no_name_provided_$factory_9());
    var tmp_19 = this;
    var tmp0_unsafeCast_0_9 = Error;
    var tmp_20 = tmp0_unsafeCast_0_9;
    tmp_19._throwableClass = new PrimitiveKClassImpl(tmp_20, 'Throwable', _no_name_provided_$factory_10());
    var tmp_21 = this;
    var tmp0_unsafeCast_0_10 = Array;
    var tmp_22 = tmp0_unsafeCast_0_10;
    tmp_21._booleanArrayClass = new PrimitiveKClassImpl(tmp_22, 'BooleanArray', _no_name_provided_$factory_11());
    var tmp_23 = this;
    var tmp0_unsafeCast_0_11 = Uint16Array;
    var tmp_24 = tmp0_unsafeCast_0_11;
    tmp_23._charArrayClass = new PrimitiveKClassImpl(tmp_24, 'CharArray', _no_name_provided_$factory_12());
    var tmp_25 = this;
    var tmp0_unsafeCast_0_12 = Int8Array;
    var tmp_26 = tmp0_unsafeCast_0_12;
    tmp_25._byteArrayClass = new PrimitiveKClassImpl(tmp_26, 'ByteArray', _no_name_provided_$factory_13());
    var tmp_27 = this;
    var tmp0_unsafeCast_0_13 = Int16Array;
    var tmp_28 = tmp0_unsafeCast_0_13;
    tmp_27._shortArrayClass = new PrimitiveKClassImpl(tmp_28, 'ShortArray', _no_name_provided_$factory_14());
    var tmp_29 = this;
    var tmp0_unsafeCast_0_14 = Int32Array;
    var tmp_30 = tmp0_unsafeCast_0_14;
    tmp_29._intArrayClass = new PrimitiveKClassImpl(tmp_30, 'IntArray', _no_name_provided_$factory_15());
    var tmp_31 = this;
    var tmp0_unsafeCast_0_15 = Array;
    var tmp_32 = tmp0_unsafeCast_0_15;
    tmp_31._longArrayClass = new PrimitiveKClassImpl(tmp_32, 'LongArray', _no_name_provided_$factory_16());
    var tmp_33 = this;
    var tmp0_unsafeCast_0_16 = Float32Array;
    var tmp_34 = tmp0_unsafeCast_0_16;
    tmp_33._floatArrayClass = new PrimitiveKClassImpl(tmp_34, 'FloatArray', _no_name_provided_$factory_17());
    var tmp_35 = this;
    var tmp0_unsafeCast_0_17 = Float64Array;
    var tmp_36 = tmp0_unsafeCast_0_17;
    tmp_35._doubleArrayClass = new PrimitiveKClassImpl(tmp_36, 'DoubleArray', _no_name_provided_$factory_18());
  }
  PrimitiveClasses_0.prototype._get_anyClass_ = function () {
    return this._anyClass;
  };
  PrimitiveClasses_0.prototype._get_numberClass_ = function () {
    return this._numberClass;
  };
  PrimitiveClasses_0.prototype._get_nothingClass_ = function () {
    return this._nothingClass;
  };
  PrimitiveClasses_0.prototype._get_booleanClass_ = function () {
    return this._booleanClass;
  };
  PrimitiveClasses_0.prototype._get_byteClass_ = function () {
    return this._byteClass;
  };
  PrimitiveClasses_0.prototype._get_shortClass_ = function () {
    return this._shortClass;
  };
  PrimitiveClasses_0.prototype._get_intClass_ = function () {
    return this._intClass;
  };
  PrimitiveClasses_0.prototype._get_floatClass_ = function () {
    return this._floatClass;
  };
  PrimitiveClasses_0.prototype._get_doubleClass_ = function () {
    return this._doubleClass;
  };
  PrimitiveClasses_0.prototype._get_arrayClass_ = function () {
    return this._arrayClass;
  };
  PrimitiveClasses_0.prototype._get_stringClass_ = function () {
    return this._stringClass;
  };
  PrimitiveClasses_0.prototype._get_throwableClass_ = function () {
    return this._throwableClass;
  };
  PrimitiveClasses_0.prototype._get_booleanArrayClass_ = function () {
    return this._booleanArrayClass;
  };
  PrimitiveClasses_0.prototype._get_charArrayClass_ = function () {
    return this._charArrayClass;
  };
  PrimitiveClasses_0.prototype._get_byteArrayClass_ = function () {
    return this._byteArrayClass;
  };
  PrimitiveClasses_0.prototype._get_shortArrayClass_ = function () {
    return this._shortArrayClass;
  };
  PrimitiveClasses_0.prototype._get_intArrayClass_ = function () {
    return this._intArrayClass;
  };
  PrimitiveClasses_0.prototype._get_longArrayClass_ = function () {
    return this._longArrayClass;
  };
  PrimitiveClasses_0.prototype._get_floatArrayClass_ = function () {
    return this._floatArrayClass;
  };
  PrimitiveClasses_0.prototype._get_doubleArrayClass_ = function () {
    return this._doubleArrayClass;
  };
  PrimitiveClasses_0.prototype.functionClass = function (arity) {
    var tmp0_elvis_lhs = functionClasses[arity];
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var tmp0_unsafeCast_0_3 = Function;
      var tmp_0 = tmp0_unsafeCast_0_3;
      var tmp_1 = '' + 'Function' + arity;
      var result_2 = new PrimitiveKClassImpl(tmp_0, tmp_1, _no_name_provided_$factory_19(arity));
      var tmp1_asDynamic_0_5 = functionClasses;
      tmp1_asDynamic_0_5[arity] = result_2;
      tmp = result_2;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  PrimitiveClasses_0.$metadata$ = {
    simpleName: 'PrimitiveClasses',
    kind: 'object',
    interfaces: []
  };
  Object.defineProperty(PrimitiveClasses_0.prototype, 'anyClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_anyClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'numberClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_numberClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'nothingClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_nothingClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'booleanClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_booleanClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'byteClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_byteClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'shortClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_shortClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'intClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_intClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'floatClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_floatClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'doubleClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_doubleClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'arrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_arrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'stringClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_stringClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'throwableClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_throwableClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'booleanArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_booleanArrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'charArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_charArrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'byteArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_byteArrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'shortArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_shortArrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'intArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_intArrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'longArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_longArrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'floatArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_floatArrayClass_
  });
  Object.defineProperty(PrimitiveClasses_0.prototype, 'doubleArrayClass', {
    configurable: true,
    get: PrimitiveClasses_0.prototype._get_doubleArrayClass_
  });
  var PrimitiveClasses_instance;
  function PrimitiveClasses_getInstance() {
    if (PrimitiveClasses_instance == null)
      new PrimitiveClasses_0();
    return PrimitiveClasses_instance;
  }
  function _no_name_provided_$factory_0() {
    var i = new _no_name_provided__0();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_1() {
    var i = new _no_name_provided__1();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_2() {
    var i = new _no_name_provided__2();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_3() {
    var i = new _no_name_provided__3();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_4() {
    var i = new _no_name_provided__4();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_5() {
    var i = new _no_name_provided__5();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_6() {
    var i = new _no_name_provided__6();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_7() {
    var i = new _no_name_provided__7();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_8() {
    var i = new _no_name_provided__8();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_9() {
    var i = new _no_name_provided__9();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_10() {
    var i = new _no_name_provided__10();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_11() {
    var i = new _no_name_provided__11();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_12() {
    var i = new _no_name_provided__12();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_13() {
    var i = new _no_name_provided__13();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_14() {
    var i = new _no_name_provided__14();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_15() {
    var i = new _no_name_provided__15();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_16() {
    var i = new _no_name_provided__16();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_17() {
    var i = new _no_name_provided__17();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_18() {
    var i = new _no_name_provided__18();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function _no_name_provided_$factory_19($arity) {
    var i = new _no_name_provided__19($arity);
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function functionClasses$init$() {
    var tmp0_arrayOfNulls_0 = 0;
    return fillArrayVal(Array(tmp0_arrayOfNulls_0), null);
  }
  function getKClass_0(jClass) {
    var tmp;
    if (Array.isArray(jClass)) {
      tmp = getKClassM_0(jClass);
    } else {
      tmp = getKClass1_0(jClass);
    }
    return tmp;
  }
  function getKClassM_0(jClasses) {
    var tmp0_subject = jClasses.length;
    var tmp;
    switch (tmp0_subject) {
      case 1:
        tmp = getKClass1_0(jClasses[0]);
        break;
      case 0:
        var tmp0_unsafeCast_0 = NothingKClassImpl_getInstance();
        tmp = tmp0_unsafeCast_0;
        break;
      default:var tmp1_unsafeCast_0 = new ErrorKClass();
        tmp = tmp1_unsafeCast_0;
        break;
    }
    return tmp;
  }
  function getKClass1_0(jClass) {
    if (jClass === String) {
      var tmp0_unsafeCast_0 = PrimitiveClasses_getInstance()._stringClass;
      return tmp0_unsafeCast_0;
    }var metadata = jClass.$metadata$;
    var tmp;
    if (metadata != null) {
      var tmp_0;
      if (metadata.$kClass$ == null) {
        var kClass = new SimpleKClassImpl(jClass);
        metadata.$kClass$ = kClass;
        tmp_0 = kClass;
      } else {
        tmp_0 = metadata.$kClass$;
      }
      tmp = tmp_0;
    } else {
      tmp = new SimpleKClassImpl(jClass);
    }
    return tmp;
  }
  function Appendable() {
  }
  Appendable.$metadata$ = {
    simpleName: 'Appendable',
    kind: 'interface',
    interfaces: []
  };
  function StringBuilder_init_$Init$($this) {
    StringBuilder.call($this, '');
    return $this;
  }
  function StringBuilder_init_$Create$() {
    return StringBuilder_init_$Init$(Object.create(StringBuilder.prototype));
  }
  function StringBuilder(content) {
    this._string = !(content === undefined) ? content : '';
  }
  StringBuilder.prototype._get_length_ = function () {
    var tmp0_asDynamic_0 = this._string;
    return tmp0_asDynamic_0.length;
  };
  StringBuilder.prototype.append_1 = function (value) {
    var tmp0_this = this;
    tmp0_this._string = tmp0_this._string + value;
    return this;
  };
  StringBuilder.prototype.append_2 = function (value) {
    var tmp0_this = this;
    tmp0_this._string = tmp0_this._string + toString(value);
    return this;
  };
  StringBuilder.prototype.append_3 = function (value) {
    var tmp0_this = this;
    var tmp = tmp0_this;
    var tmp_0 = tmp0_this._string;
    var tmp1_elvis_lhs = value;
    tmp._string = tmp_0 + (tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs);
    return this;
  };
  StringBuilder.prototype.substring = function (startIndex, endIndex) {
    Companion_getInstance().checkBoundsIndexes(startIndex, endIndex, this._get_length_());
    var tmp0_substring_0 = this._string;
    return tmp0_substring_0.substring(startIndex, endIndex);
  };
  StringBuilder.prototype.toString = function () {
    return this._string;
  };
  StringBuilder.$metadata$ = {
    simpleName: 'StringBuilder',
    kind: 'class',
    interfaces: [Appendable, CharSequence]
  };
  function Char() {
  }
  Char.$metadata$ = {
    simpleName: 'Char',
    kind: 'class',
    interfaces: [Comparable]
  };
  function Iterable() {
  }
  Iterable.$metadata$ = {
    simpleName: 'Iterable',
    kind: 'interface',
    interfaces: []
  };
  function List() {
  }
  List.$metadata$ = {
    simpleName: 'List',
    kind: 'interface',
    interfaces: [Collection]
  };
  function MutableList() {
  }
  MutableList.$metadata$ = {
    simpleName: 'MutableList',
    kind: 'interface',
    interfaces: [List, MutableCollection]
  };
  function Collection() {
  }
  Collection.$metadata$ = {
    simpleName: 'Collection',
    kind: 'interface',
    interfaces: [Iterable]
  };
  function MutableCollection() {
  }
  MutableCollection.$metadata$ = {
    simpleName: 'MutableCollection',
    kind: 'interface',
    interfaces: [Collection, MutableIterable]
  };
  function MutableIterable() {
  }
  MutableIterable.$metadata$ = {
    simpleName: 'MutableIterable',
    kind: 'interface',
    interfaces: [Iterable]
  };
  function toString(_this_) {
    var tmp0_safe_receiver = _this_;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : toString_0(tmp0_safe_receiver);
    return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
  }
  function fillArrayVal(array, initValue) {
    var inductionVariable = 0;
    var last_1 = array.length - 1 | 0;
    if (inductionVariable <= last_1)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        array[i] = initValue;
      }
       while (!(i === last_1));
    return array;
  }
  function arrayIterator(array) {
    return new _no_name_provided__20(array);
  }
  function _no_name_provided__20($array) {
    this._$array = $array;
    this._index_0 = 0;
  }
  _no_name_provided__20.prototype.hasNext_4 = function () {
    return !(this._index_0 === this._$array.length);
  };
  _no_name_provided__20.prototype.next_4 = function () {
    var tmp;
    if (!(this._index_0 === this._$array.length)) {
      var tmp0_this = this;
      var tmp1 = tmp0_this._index_0;
      tmp0_this._index_0 = tmp1 + 1 | 0;
      tmp = this._$array[tmp1];
    } else {
      throw NoSuchElementException_init_$Create$_0('' + this._index_0);
    }
    return tmp;
  };
  _no_name_provided__20.$metadata$ = {
    kind: 'class',
    interfaces: [Iterator]
  };
  var buf;
  var bufFloat64;
  var bufInt32;
  var lowIndex;
  var highIndex;
  function getNumberHashCode(obj) {
    var tmp0_unsafeCast_0 = jsBitwiseOr(obj, 0);
    if (tmp0_unsafeCast_0 === obj) {
      return numberToInt(obj);
    } else {
    }
    bufFloat64[0] = obj;
    return imul(bufInt32[highIndex], 31) + bufInt32[lowIndex] | 0;
  }
  function bufFloat64$init$() {
    var tmp0_unsafeCast_0 = new Float64Array(buf);
    return tmp0_unsafeCast_0;
  }
  function bufInt32$init$() {
    var tmp0_unsafeCast_0 = new Int32Array(buf);
    return tmp0_unsafeCast_0;
  }
  function lowIndex$init$() {
    bufFloat64[0] = -1.0;
    return !(bufInt32[0] === 0) ? 1 : 0;
  }
  function arrayToString(array) {
    return joinToString$default(array, ', ', '[', ']', 0, null, _no_name_provided_$factory_20(), 24, null);
  }
  function _no_name_provided__21() {
  }
  _no_name_provided__21.prototype.invoke_41 = function (it) {
    return toString_0(it);
  };
  _no_name_provided__21.prototype.invoke_42 = function (p1) {
    return this.invoke_41((p1 == null ? true : isObject(p1)) ? p1 : THROW_CCE());
  };
  _no_name_provided__21.$metadata$ = {
    kind: 'class',
    interfaces: []
  };
  function _no_name_provided_$factory_20() {
    var i = new _no_name_provided__21();
    return function (p1) {
      return i.invoke_41(p1);
    };
  }
  function toString_0(o) {
    var tmp;
    if (o == null) {
      tmp = 'null';
    } else if (isArrayish(o)) {
      tmp = '[...]';
    } else {
      var tmp0_unsafeCast_0 = o.toString();
      tmp = tmp0_unsafeCast_0;
    }
    return tmp;
  }
  function captureStack(instance, constructorFunction) {
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(instance, constructorFunction);
    } else {
      instance.stack = (new Error()).stack;
    }
  }
  function extendThrowable(this_, message, cause) {
    Error.call(this_);
    setPropertiesToThrowableInstance(this_, message, cause);
  }
  function setPropertiesToThrowableInstance(this_, message, cause) {
    if (!hasOwnPrototypeProperty(this_, 'message')) {
      var tmp;
      if (message == null) {
        var tmp_0;
        if (!(message === null)) {
          var tmp0_safe_receiver = cause;
          var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.toString();
          tmp_0 = tmp1_elvis_lhs == null ? undefined : tmp1_elvis_lhs;
        } else {
          tmp_0 = undefined;
        }
        tmp = tmp_0;
      } else {
        tmp = message;
      }
      this_.message = tmp;
    }if (!hasOwnPrototypeProperty(this_, 'cause')) {
      this_.cause = cause;
    }this_.name = Object.getPrototypeOf(this_).constructor.name;
  }
  function hasOwnPrototypeProperty(o, name) {
    var tmp0_unsafeCast_0 = Object.getPrototypeOf(o).hasOwnProperty(name);
    return tmp0_unsafeCast_0;
  }
  function ensureNotNull(v) {
    var tmp;
    if (v == null) {
      THROW_NPE();
    } else {
      tmp = v;
    }
    return tmp;
  }
  function THROW_NPE() {
    throw NullPointerException_init_$Create$();
  }
  function THROW_CCE() {
    throw ClassCastException_init_$Create$();
  }
  function Companion_1() {
    Companion_instance_0 = this;
    this._MIN_VALUE_0 = new Long(0, -2147483648);
    this._MAX_VALUE_0 = new Long(-1, 2147483647);
    this._SIZE_BYTES_0 = 8;
    this._SIZE_BITS_0 = 64;
  }
  Companion_1.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_0;
  function Companion_getInstance_0() {
    if (Companion_instance_0 == null)
      new Companion_1();
    return Companion_instance_0;
  }
  function Long(low, high) {
    Companion_getInstance_0();
    Number_0.call(this);
    this._low = low;
    this._high = high;
  }
  Long.prototype.plus_27 = function (other) {
    return add(this, other);
  };
  Long.prototype.div_27 = function (other) {
    return divide(this, other);
  };
  Long.prototype.unaryMinus_4 = function () {
    return this.inv_0().plus_27(new Long(1, 0));
  };
  Long.prototype.inv_0 = function () {
    return new Long(~this._low, ~this._high);
  };
  Long.prototype.toInt_4 = function () {
    return this._low;
  };
  Long.prototype.toDouble_4 = function () {
    return toNumber(this);
  };
  Long.prototype.valueOf = function () {
    return this.toDouble_4();
  };
  Long.prototype.toString = function () {
    return toStringImpl(this, 10);
  };
  Long.$metadata$ = {
    simpleName: 'Long',
    kind: 'class',
    interfaces: [Comparable]
  };
  var ZERO;
  var ONE;
  var NEG_ONE;
  var MAX_VALUE;
  var MIN_VALUE;
  var TWO_PWR_24_;
  function compare(_this_, other) {
    if (equalsLong(_this_, other)) {
      return 0;
    }var thisNeg = isNegative(_this_);
    var otherNeg = isNegative(other);
    return (thisNeg ? !otherNeg : false) ? -1 : (!thisNeg ? otherNeg : false) ? 1 : isNegative(subtract(_this_, other)) ? -1 : 1;
  }
  function add(_this_, other) {
    var a48 = _this_._high >>> 16;
    var a32 = _this_._high & 65535;
    var a16 = _this_._low >>> 16;
    var a00 = _this_._low & 65535;
    var b48 = other._high >>> 16;
    var b32 = other._high & 65535;
    var b16 = other._low >>> 16;
    var b00 = other._low & 65535;
    var c48 = 0;
    var c32 = 0;
    var c16 = 0;
    var c00 = 0;
    c00 = c00 + (a00 + b00 | 0) | 0;
    c16 = c16 + (c00 >>> 16) | 0;
    c00 = c00 & 65535;
    c16 = c16 + (a16 + b16 | 0) | 0;
    c32 = c32 + (c16 >>> 16) | 0;
    c16 = c16 & 65535;
    c32 = c32 + (a32 + b32 | 0) | 0;
    c48 = c48 + (c32 >>> 16) | 0;
    c32 = c32 & 65535;
    c48 = c48 + (a48 + b48 | 0) | 0;
    c48 = c48 & 65535;
    return new Long(c16 << 16 | c00, c48 << 16 | c32);
  }
  function subtract(_this_, other) {
    return add(_this_, other.unaryMinus_4());
  }
  function multiply(_this_, other) {
    if (isZero(_this_)) {
      return ZERO;
    } else if (isZero(other)) {
      return ZERO;
    }if (equalsLong(_this_, MIN_VALUE)) {
      return isOdd(other) ? MIN_VALUE : ZERO;
    } else if (equalsLong(other, MIN_VALUE)) {
      return isOdd(_this_) ? MIN_VALUE : ZERO;
    }if (isNegative(_this_)) {
      var tmp;
      if (isNegative(other)) {
        tmp = multiply(negate(_this_), negate(other));
      } else {
        tmp = negate(multiply(negate(_this_), other));
      }
      return tmp;
    } else if (isNegative(other)) {
      return negate(multiply(_this_, negate(other)));
    }if (lessThan(_this_, TWO_PWR_24_) ? lessThan(other, TWO_PWR_24_) : false) {
      return fromNumber(toNumber(_this_) * toNumber(other));
    }var a48 = _this_._high >>> 16;
    var a32 = _this_._high & 65535;
    var a16 = _this_._low >>> 16;
    var a00 = _this_._low & 65535;
    var b48 = other._high >>> 16;
    var b32 = other._high & 65535;
    var b16 = other._low >>> 16;
    var b00 = other._low & 65535;
    var c48 = 0;
    var c32 = 0;
    var c16 = 0;
    var c00 = 0;
    c00 = c00 + imul(a00, b00) | 0;
    c16 = c16 + (c00 >>> 16) | 0;
    c00 = c00 & 65535;
    c16 = c16 + imul(a16, b00) | 0;
    c32 = c32 + (c16 >>> 16) | 0;
    c16 = c16 & 65535;
    c16 = c16 + imul(a00, b16) | 0;
    c32 = c32 + (c16 >>> 16) | 0;
    c16 = c16 & 65535;
    c32 = c32 + imul(a32, b00) | 0;
    c48 = c48 + (c32 >>> 16) | 0;
    c32 = c32 & 65535;
    c32 = c32 + imul(a16, b16) | 0;
    c48 = c48 + (c32 >>> 16) | 0;
    c32 = c32 & 65535;
    c32 = c32 + imul(a00, b32) | 0;
    c48 = c48 + (c32 >>> 16) | 0;
    c32 = c32 & 65535;
    c48 = c48 + (((imul(a48, b00) + imul(a32, b16) | 0) + imul(a16, b32) | 0) + imul(a00, b48) | 0) | 0;
    c48 = c48 & 65535;
    return new Long(c16 << 16 | c00, c48 << 16 | c32);
  }
  function divide(_this_, other) {
    if (isZero(other)) {
      throw Exception_init_$Create$('division by zero');
    } else if (isZero(_this_)) {
      return ZERO;
    }if (equalsLong(_this_, MIN_VALUE)) {
      if (equalsLong(other, ONE) ? true : equalsLong(other, NEG_ONE)) {
        return MIN_VALUE;
      } else if (equalsLong(other, MIN_VALUE)) {
        return ONE;
      } else {
        var halfThis = shiftRight(_this_, 1);
        var approx = shiftLeft(halfThis.div_27(other), 1);
        if (equalsLong(approx, ZERO)) {
          return isNegative(other) ? ONE : NEG_ONE;
        } else {
          var rem = subtract(_this_, multiply(other, approx));
          return add(approx, rem.div_27(other));
        }
      }
    } else if (equalsLong(other, MIN_VALUE)) {
      return ZERO;
    }if (isNegative(_this_)) {
      var tmp;
      if (isNegative(other)) {
        tmp = negate(_this_).div_27(negate(other));
      } else {
        tmp = negate(negate(_this_).div_27(other));
      }
      return tmp;
    } else if (isNegative(other)) {
      return negate(_this_.div_27(negate(other)));
    }var res = ZERO;
    var rem_0 = _this_;
    while (greaterThanOrEqual(rem_0, other)) {
      var approxDouble = toNumber(rem_0) / toNumber(other);
      var approx2 = function () {
        var $externalVarargReceiverTmp = Math;
        return $externalVarargReceiverTmp.max.apply($externalVarargReceiverTmp, [].concat([].slice.call(new Float64Array([1.0, Math.floor(approxDouble)]))));
      }.call(this);
      var log2 = Math.ceil(Math.log(approx2) / Math.LN2);
      var delta_0 = log2 <= 48.0 ? 1.0 : Math.pow(2.0, log2 - 48);
      var approxRes = fromNumber(approx2);
      var approxRem = multiply(approxRes, other);
      while (isNegative(approxRem) ? true : greaterThan(approxRem, rem_0)) {
        approx2 = approx2 - delta_0;
        approxRes = fromNumber(approx2);
        approxRem = multiply(approxRes, other);
      }
      if (isZero(approxRes)) {
        approxRes = ONE;
      }res = add(res, approxRes);
      rem_0 = subtract(rem_0, approxRem);
    }
    return res;
  }
  function shiftLeft(_this_, numBits) {
    var numBits_0 = numBits & 63;
    if (numBits_0 === 0) {
      return _this_;
    } else {
      if (numBits_0 < 32) {
        return new Long(_this_._low << numBits_0, _this_._high << numBits_0 | _this_._low >>> (32 - numBits_0 | 0));
      } else {
        return new Long(0, _this_._low << (numBits_0 - 32 | 0));
      }
    }
  }
  function shiftRight(_this_, numBits) {
    var numBits_0 = numBits & 63;
    if (numBits_0 === 0) {
      return _this_;
    } else {
      if (numBits_0 < 32) {
        return new Long(_this_._low >>> numBits_0 | _this_._high << (32 - numBits_0 | 0), _this_._high >> numBits_0);
      } else {
        return new Long(_this_._high >> (numBits_0 - 32 | 0), _this_._high >= 0 ? 0 : -1);
      }
    }
  }
  function toNumber(_this_) {
    return _this_._high * 4.294967296E9 + getLowBitsUnsigned(_this_);
  }
  function equalsLong(_this_, other) {
    return _this_._high === other._high ? _this_._low === other._low : false;
  }
  function toStringImpl(_this_, radix) {
    if (radix < 2 ? true : 36 < radix) {
      throw Exception_init_$Create$('' + 'radix out of range: ' + radix);
    }if (isZero(_this_)) {
      return '0';
    }if (isNegative(_this_)) {
      if (equalsLong(_this_, MIN_VALUE)) {
        var radixLong = fromInt(radix);
        var div = _this_.div_27(radixLong);
        var rem = subtract(multiply(div, radixLong), _this_).toInt_4();
        var tmp = toStringImpl(div, radix);
        var tmp0_unsafeCast_0 = rem.toString(radix);
        return tmp + tmp0_unsafeCast_0;
      } else {
        return '' + '-' + toStringImpl(negate(_this_), radix);
      }
    }var radixToPower = fromNumber(Math.pow(radix, 6.0));
    var rem_0 = _this_;
    var result = '';
    while (true) {
      var remDiv = rem_0.div_27(radixToPower);
      var intval = subtract(rem_0, multiply(remDiv, radixToPower)).toInt_4();
      var tmp1_unsafeCast_0 = intval.toString(radix);
      var digits = tmp1_unsafeCast_0;
      rem_0 = remDiv;
      if (isZero(rem_0)) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = digits + result;
      }
    }
  }
  function fromInt(value) {
    return new Long(value, value < 0 ? -1 : 0);
  }
  function isNegative(_this_) {
    return _this_._high < 0;
  }
  function isZero(_this_) {
    return _this_._high === 0 ? _this_._low === 0 : false;
  }
  function isOdd(_this_) {
    return (_this_._low & 1) === 1;
  }
  function negate(_this_) {
    return _this_.unaryMinus_4();
  }
  function lessThan(_this_, other) {
    return compare(_this_, other) < 0;
  }
  function fromNumber(value) {
    if (isNaN_0(value)) {
      return ZERO;
    } else if (value <= -9.223372036854776E18) {
      return MIN_VALUE;
    } else if (value + 1 >= 9.223372036854776E18) {
      return MAX_VALUE;
    } else if (value < 0.0) {
      return negate(fromNumber(-value));
    } else {
      var twoPwr32 = 4.294967296E9;
      return new Long(jsBitwiseOr(value % twoPwr32, 0), jsBitwiseOr(value / twoPwr32, 0));
    }
  }
  function greaterThan(_this_, other) {
    return compare(_this_, other) > 0;
  }
  function greaterThanOrEqual(_this_, other) {
    return compare(_this_, other) >= 0;
  }
  function getLowBitsUnsigned(_this_) {
    return _this_._low >= 0 ? _this_._low : 4.294967296E9 + _this_._low;
  }
  function imul(a_local, b_local) {
    var lhs = jsBitwiseAnd(a_local, 4.29490176E9) * jsBitwiseAnd(b_local, 65535);
    var rhs = jsBitwiseAnd(a_local, 65535) * b_local;
    return jsBitwiseOr(lhs + rhs, 0);
  }
  function numberToInt(a) {
    var tmp;
    if (a instanceof Long) {
      tmp = a.toInt_4();
    } else {
      {
        tmp = doubleToInt(a);
      }
    }
    return tmp;
  }
  function doubleToInt(a) {
    return a > 2.147483647E9 ? 2147483647 : a < -2.147483648E9 ? -2147483648 : jsBitwiseOr(a, 0);
  }
  function isArrayish(o) {
    var tmp;
    if (isJsArray(o)) {
      tmp = true;
    } else {
      var tmp0_unsafeCast_0 = ArrayBuffer.isView(o);
      tmp = tmp0_unsafeCast_0;
    }
    return tmp;
  }
  function isJsArray(obj) {
    var tmp0_unsafeCast_0 = Array.isArray(obj);
    return tmp0_unsafeCast_0;
  }
  function isInterface(obj, iface) {
    var tmp0_elvis_lhs = obj.constructor;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var ctor = tmp;
    return isInterfaceImpl(ctor, iface);
  }
  function isInterfaceImpl(ctor, iface) {
    if (ctor === iface)
      return true;
    var metadata = ctor.$metadata$;
    if (!(metadata == null)) {
      var interfaces = metadata.interfaces;
      var indexedObject = interfaces;
      var inductionVariable = 0;
      var last_1 = indexedObject.length;
      while (inductionVariable < last_1) {
        var i = indexedObject[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        if (isInterfaceImpl(i, iface)) {
          return true;
        }}
    }var superPrototype = !(ctor.prototype == null) ? Object.getPrototypeOf(ctor.prototype) : null;
    var superConstructor = superPrototype != null ? superPrototype.constructor : null;
    return !(superConstructor == null) ? isInterfaceImpl(superConstructor, iface) : false;
  }
  function isArray(obj) {
    var tmp;
    if (isJsArray(obj)) {
      tmp = !obj.$type$;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function isObject(obj) {
    var objTypeOf = typeof obj;
    var tmp0_subject = objTypeOf;
    switch (tmp0_subject) {
      case 'string':
        return true;
      case 'number':
        return true;
      case 'boolean':
        return true;
      case 'function':
        return true;
      default:return jsInstanceOf(obj, Object);
    }
  }
  function isNumber(a) {
    var tmp;
    if (typeof a === 'number') {
      tmp = true;
    } else {
      tmp = a instanceof Long;
    }
    return tmp;
  }
  function isCharSequence(value) {
    return typeof value === 'string' ? true : isInterface(value, _get_js_(getKClass_0(CharSequence)));
  }
  function isBooleanArray(a) {
    return isJsArray(a) ? a.$type$ === 'BooleanArray' : false;
  }
  function isByteArray(a) {
    return jsInstanceOf(a, Int8Array);
  }
  function isShortArray(a) {
    return jsInstanceOf(a, Int16Array);
  }
  function isCharArray(a) {
    return isJsArray(a) ? a.$type$ === 'CharArray' : false;
  }
  function isIntArray(a) {
    return jsInstanceOf(a, Int32Array);
  }
  function isFloatArray(a) {
    return jsInstanceOf(a, Float32Array);
  }
  function isLongArray(a) {
    return isJsArray(a) ? a.$type$ === 'LongArray' : false;
  }
  function isDoubleArray(a) {
    return jsInstanceOf(a, Float64Array);
  }
  function Exception_init_$Init$($this) {
    extendThrowable($this, void 1, void 1);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Init$_0(message, $this) {
    extendThrowable($this, message, void 1);
    Exception.call($this);
    return $this;
  }
  function Exception_init_$Create$(message) {
    var tmp = Exception_init_$Init$_0(message, Object.create(Exception.prototype));
    captureStack(tmp, Exception_init_$Create$);
    return tmp;
  }
  function Exception() {
    captureStack(this, Exception);
  }
  Exception.$metadata$ = {
    simpleName: 'Exception',
    kind: 'class',
    interfaces: []
  };
  function IllegalArgumentException_init_$Init$(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    IllegalArgumentException.call($this);
    return $this;
  }
  function IllegalArgumentException_init_$Create$(message) {
    var tmp = IllegalArgumentException_init_$Init$(message, Object.create(IllegalArgumentException.prototype));
    captureStack(tmp, IllegalArgumentException_init_$Create$);
    return tmp;
  }
  function IllegalArgumentException() {
    captureStack(this, IllegalArgumentException);
  }
  IllegalArgumentException.$metadata$ = {
    simpleName: 'IllegalArgumentException',
    kind: 'class',
    interfaces: []
  };
  function RuntimeException_init_$Init$($this) {
    Exception_init_$Init$($this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException_init_$Init$_0(message, $this) {
    Exception_init_$Init$_0(message, $this);
    RuntimeException.call($this);
    return $this;
  }
  function RuntimeException() {
    captureStack(this, RuntimeException);
  }
  RuntimeException.$metadata$ = {
    simpleName: 'RuntimeException',
    kind: 'class',
    interfaces: []
  };
  function NoSuchElementException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    NoSuchElementException.call($this);
    return $this;
  }
  function NoSuchElementException_init_$Create$() {
    var tmp = NoSuchElementException_init_$Init$(Object.create(NoSuchElementException.prototype));
    captureStack(tmp, NoSuchElementException_init_$Create$);
    return tmp;
  }
  function NoSuchElementException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    NoSuchElementException.call($this);
    return $this;
  }
  function NoSuchElementException_init_$Create$_0(message) {
    var tmp = NoSuchElementException_init_$Init$_0(message, Object.create(NoSuchElementException.prototype));
    captureStack(tmp, NoSuchElementException_init_$Create$_0);
    return tmp;
  }
  function NoSuchElementException() {
    captureStack(this, NoSuchElementException);
  }
  NoSuchElementException.$metadata$ = {
    simpleName: 'NoSuchElementException',
    kind: 'class',
    interfaces: []
  };
  function UnsupportedOperationException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    UnsupportedOperationException.call($this);
    return $this;
  }
  function UnsupportedOperationException_init_$Create$() {
    var tmp = UnsupportedOperationException_init_$Init$(Object.create(UnsupportedOperationException.prototype));
    captureStack(tmp, UnsupportedOperationException_init_$Create$);
    return tmp;
  }
  function UnsupportedOperationException_init_$Init$_0(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    UnsupportedOperationException.call($this);
    return $this;
  }
  function UnsupportedOperationException_init_$Create$_0(message) {
    var tmp = UnsupportedOperationException_init_$Init$_0(message, Object.create(UnsupportedOperationException.prototype));
    captureStack(tmp, UnsupportedOperationException_init_$Create$_0);
    return tmp;
  }
  function UnsupportedOperationException() {
    captureStack(this, UnsupportedOperationException);
  }
  UnsupportedOperationException.$metadata$ = {
    simpleName: 'UnsupportedOperationException',
    kind: 'class',
    interfaces: []
  };
  function IndexOutOfBoundsException_init_$Init$(message, $this) {
    RuntimeException_init_$Init$_0(message, $this);
    IndexOutOfBoundsException.call($this);
    return $this;
  }
  function IndexOutOfBoundsException_init_$Create$(message) {
    var tmp = IndexOutOfBoundsException_init_$Init$(message, Object.create(IndexOutOfBoundsException.prototype));
    captureStack(tmp, IndexOutOfBoundsException_init_$Create$);
    return tmp;
  }
  function IndexOutOfBoundsException() {
    captureStack(this, IndexOutOfBoundsException);
  }
  IndexOutOfBoundsException.$metadata$ = {
    simpleName: 'IndexOutOfBoundsException',
    kind: 'class',
    interfaces: []
  };
  function NullPointerException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    NullPointerException.call($this);
    return $this;
  }
  function NullPointerException_init_$Create$() {
    var tmp = NullPointerException_init_$Init$(Object.create(NullPointerException.prototype));
    captureStack(tmp, NullPointerException_init_$Create$);
    return tmp;
  }
  function NullPointerException() {
    captureStack(this, NullPointerException);
  }
  NullPointerException.$metadata$ = {
    simpleName: 'NullPointerException',
    kind: 'class',
    interfaces: []
  };
  function ClassCastException_init_$Init$($this) {
    RuntimeException_init_$Init$($this);
    ClassCastException.call($this);
    return $this;
  }
  function ClassCastException_init_$Create$() {
    var tmp = ClassCastException_init_$Init$(Object.create(ClassCastException.prototype));
    captureStack(tmp, ClassCastException_init_$Create$);
    return tmp;
  }
  function ClassCastException() {
    captureStack(this, ClassCastException);
  }
  ClassCastException.$metadata$ = {
    simpleName: 'ClassCastException',
    kind: 'class',
    interfaces: []
  };
  function jsBitwiseOr(lhs_hack, rhs_hack) {
    var tmp0_unsafeCast_0 = jsBitwiseOr$outlinedJsCode$_0(lhs_hack, rhs_hack);
    return tmp0_unsafeCast_0;
  }
  function jsTypeOf(value_hack) {
    var tmp0_unsafeCast_0 = jsTypeOf$outlinedJsCode$_1(value_hack);
    return tmp0_unsafeCast_0;
  }
  function jsInstanceOf(obj_hack, jsClass_hack) {
    var tmp0_unsafeCast_0 = jsInstanceOf$outlinedJsCode$_2(obj_hack, jsClass_hack);
    return tmp0_unsafeCast_0;
  }
  function jsBitwiseAnd(lhs_hack, rhs_hack) {
    var tmp0_unsafeCast_0 = jsBitwiseAnd$outlinedJsCode$_3(lhs_hack, rhs_hack);
    return tmp0_unsafeCast_0;
  }
  function jsBitwiseOr$outlinedJsCode$_0(lhs_hack, rhs_hack) {
    return lhs_hack | rhs_hack;
  }
  function jsTypeOf$outlinedJsCode$_1(value_hack) {
    return typeof value_hack;
  }
  function jsInstanceOf$outlinedJsCode$_2(obj_hack, jsClass_hack) {
    return obj_hack instanceof jsClass_hack;
  }
  function jsBitwiseAnd$outlinedJsCode$_3(lhs_hack, rhs_hack) {
    return lhs_hack & rhs_hack;
  }
  function ICurvature() {
  }
  ICurvature.$metadata$ = {
    simpleName: 'ICurvature',
    kind: 'interface',
    interfaces: [State]
  };
  function IPose2d() {
  }
  IPose2d.$metadata$ = {
    simpleName: 'IPose2d',
    kind: 'interface',
    interfaces: [IRotation2d, ITranslation2d]
  };
  function IRotation2d() {
  }
  IRotation2d.$metadata$ = {
    simpleName: 'IRotation2d',
    kind: 'interface',
    interfaces: [State]
  };
  function ITranslation2d() {
  }
  ITranslation2d.$metadata$ = {
    simpleName: 'ITranslation2d',
    kind: 'interface',
    interfaces: [State]
  };
  function intersectionInternal($this, a, b) {
    var a_r = a._get_rotation__1();
    var b_r = b._get_rotation__1();
    var a_t = a._get_translation__1();
    var b_t = b._get_translation__1();
    var tan_b = b_r.tan();
    var t = ((a_t.x() - b_t.x()) * tan_b + b_t.y() - a_t.y()) / (a_r.sin() - a_r.cos() * tan_b);
    var tmp;
    if (isNaN_0(t)) {
      DoubleCompanionObject_getInstance();
      DoubleCompanionObject_getInstance();
      tmp = new Translation2d(Infinity, Infinity);
    } else {
      tmp = a_t.translateBy(a_r.toTranslation().scale(t));
    }
    return tmp;
  }
  function Pose2d_init_$Init$(translation_, rotation_, $mask0, $marker, $this) {
    if (!(($mask0 & 1) === 0))
      translation_ = Translation2d_init_$Create$();
    if (!(($mask0 & 2) === 0))
      rotation_ = Rotation2d_init_$Create$_0();
    Pose2d.call($this, translation_, rotation_);
    return $this;
  }
  function Pose2d_init_$Create$(translation_, rotation_, $mask0, $marker) {
    return Pose2d_init_$Init$(translation_, rotation_, $mask0, $marker, Object.create(Pose2d.prototype));
  }
  function Pose2d_init_$Init$_0($this) {
    Pose2d.call($this, Translation2d_init_$Create$(), Rotation2d_init_$Create$_0());
    return $this;
  }
  function Pose2d_init_$Create$_0() {
    return Pose2d_init_$Init$_0(Object.create(Pose2d.prototype));
  }
  function Pose2d_init_$Init$_1(x, y, rotation, $this) {
    Pose2d.call($this, new Translation2d(x, y), rotation);
    return $this;
  }
  function Pose2d_init_$Create$_1(x, y, rotation) {
    return Pose2d_init_$Init$_1(x, y, rotation, Object.create(Pose2d.prototype));
  }
  function Pose2d_init_$Init$_2(x, y, rotation, $this) {
    Pose2d_init_$Init$_1(x, y, Companion_getInstance_3().fromDegrees(rotation), $this);
    return $this;
  }
  function Pose2d_init_$Create$_2(x, y, rotation) {
    return Pose2d_init_$Init$_2(x, y, rotation, Object.create(Pose2d.prototype));
  }
  function Pose2d_init_$Init$_3(other, $this) {
    Pose2d.call($this, Translation2d_init_$Create$_0(other._translation_), Rotation2d_init_$Create$_1(other._rotation_));
    return $this;
  }
  function Pose2d_init_$Create$_3(other) {
    return Pose2d_init_$Init$_3(other, Object.create(Pose2d.prototype));
  }
  function Companion_2() {
    Companion_instance_1 = this;
    this._kIdentity = Pose2d_init_$Create$_0();
    this._kEps = 1.0E-9;
  }
  Companion_2.prototype.identity = function () {
    return this._kIdentity;
  };
  Companion_2.prototype.fromTranslation = function (translation) {
    return new Pose2d(translation, Rotation2d_init_$Create$_0());
  };
  Companion_2.prototype.fromRotation = function (rotation) {
    return new Pose2d(Translation2d_init_$Create$(), rotation);
  };
  Companion_2.prototype.exp = function (delta_0) {
    var tmp0_sin_0 = delta_0._dtheta;
    var sin_theta = Math.sin(tmp0_sin_0);
    var tmp1_cos_0 = delta_0._dtheta;
    var cos_theta = Math.cos(tmp1_cos_0);
    var s;
    var c;
    var tmp2_abs_0 = delta_0._dtheta;
    if (Math.abs(tmp2_abs_0) < 1.0E-9) {
      s = 1.0 - 0.16666666666666666 * delta_0._dtheta * delta_0._dtheta;
      c = 0.5 * delta_0._dtheta;
    } else {
      {
        s = sin_theta / delta_0._dtheta;
        c = (1.0 - cos_theta) / delta_0._dtheta;
      }
    }
    return new Pose2d(new Translation2d(delta_0._dx * s - delta_0._dy * c, delta_0._dx * c + delta_0._dy * s), new Rotation2d(cos_theta, sin_theta, false));
  };
  Companion_2.prototype.log = function (transform) {
    var dtheta = transform._get_rotation__1()._get_radians_();
    var half_dtheta = 0.5 * dtheta;
    var cos_minus_one = transform._get_rotation__1().cos() - 1.0;
    var tmp;
    if (Math.abs(cos_minus_one) < 1.0E-9) {
      tmp = 1.0 - 0.08333333333333333 * dtheta * dtheta;
    } else {
      {
        tmp = -(half_dtheta * transform._get_rotation__1().sin()) / cos_minus_one;
      }
    }
    var halftheta_by_tan_of_halfdtheta = tmp;
    var translation_part = transform._get_translation__1().rotateBy(new Rotation2d(halftheta_by_tan_of_halfdtheta, -half_dtheta, false));
    return new Twist2d(translation_part.x(), translation_part.y(), dtheta);
  };
  Companion_2.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 == null)
      new Companion_2();
    return Companion_instance_1;
  }
  function Pose2d(translation_, rotation_) {
    Companion_getInstance_1();
    var translation__0 = translation_ === void 1 ? Translation2d_init_$Create$() : translation_;
    var rotation__0 = rotation_ === void 1 ? Rotation2d_init_$Create$_0() : rotation_;
    this._translation_ = translation__0;
    this._rotation_ = rotation__0;
  }
  Pose2d.prototype._get_translation__1 = function () {
    return this._translation_;
  };
  Pose2d.prototype._get_rotation__1 = function () {
    return this._rotation_;
  };
  Pose2d.prototype.transformBy = function (other) {
    return new Pose2d(this._translation_.translateBy(other._translation_.rotateBy(this._rotation_)), this._rotation_.rotateBy(other._rotation_));
  };
  Pose2d.prototype.inverse = function () {
    var rotation_inverted = this._rotation_.inverse();
    return new Pose2d(this._translation_.inverse().rotateBy(rotation_inverted), rotation_inverted);
  };
  Pose2d.prototype.normal = function () {
    return new Pose2d(this._translation_, this._rotation_.normal());
  };
  Pose2d.prototype.intersection = function (other) {
    var other_rotation = other._get_rotation__1();
    if (this._rotation_.isParallel(other_rotation)) {
      DoubleCompanionObject_getInstance();
      DoubleCompanionObject_getInstance();
      return new Translation2d(Infinity, Infinity);
    }var tmp;
    var tmp0_abs_0 = this._rotation_.cos();
    var tmp_0 = Math.abs(tmp0_abs_0);
    var tmp1_abs_0 = other_rotation.cos();
    if (tmp_0 < Math.abs(tmp1_abs_0)) {
      tmp = intersectionInternal(Companion_getInstance_1(), this, other);
    } else {
      {
        tmp = intersectionInternal(Companion_getInstance_1(), other, this);
      }
    }
    return tmp;
  };
  Pose2d.prototype.isColinear = function (other) {
    if (!this._get_rotation__1().isParallel(other._get_rotation__1()))
      return false;
    var twist = Companion_getInstance_1().log(this.inverse().transformBy(other));
    var tmp;
    var tmp_0 = Util_getInstance();
    if (tmp_0.epsilonEquals$default(twist._dy, 0.0, 0.0, 4, null)) {
      var tmp_1 = Util_getInstance();
      tmp = tmp_1.epsilonEquals$default(twist._dtheta, 0.0, 0.0, 4, null);
    } else {
      {
        tmp = false;
      }
    }
    return tmp;
  };
  Pose2d.prototype.epsilonEquals = function (other, epsilon) {
    return this._get_translation__1().epsilonEquals(other._get_translation__1(), epsilon) ? this._get_rotation__1().isParallel(other._get_rotation__1()) : false;
  };
  Pose2d.prototype.interpolate = function (other, x) {
    if (x <= 0.0) {
      return Pose2d_init_$Create$_3(this);
    } else if (x >= 1.0) {
      return Pose2d_init_$Create$_3(other);
    }var twist = Companion_getInstance_1().log(this.inverse().transformBy(other));
    return this.transformBy(Companion_getInstance_1().exp(twist.scaled(x)));
  };
  Pose2d.prototype.interpolate_4 = function (other, x) {
    return this.interpolate(other instanceof Pose2d ? other : THROW_CCE(), x);
  };
  Pose2d.prototype.toString = function () {
    return '' + 'T:' + this._translation_ + ', R:' + this._rotation_;
  };
  Pose2d.prototype.toCSV_1 = function () {
    return this._translation_.toCSV_1() + ',' + this._rotation_.toCSV_1();
  };
  Pose2d.prototype.distance = function (other) {
    return Companion_getInstance_1().log(this.inverse().transformBy(other)).norm_0();
  };
  Pose2d.prototype.distance_4 = function (other) {
    return this.distance(other instanceof Pose2d ? other : THROW_CCE());
  };
  Pose2d.prototype.equals = function (other) {
    var tmp;
    var tmp_0;
    if (other == null) {
      tmp_0 = true;
    } else {
      tmp_0 = !(other instanceof Pose2d);
    }
    if (tmp_0) {
      tmp = false;
    } else {
      {
        var tmp_1 = other;
        Util_getInstance();
        tmp = this.epsilonEquals(tmp_1, 1.0E-12);
      }
    }
    return tmp;
  };
  Pose2d.prototype._get_pose__0 = function () {
    return this;
  };
  Pose2d.prototype.mirror = function () {
    return new Pose2d(new Translation2d(this._get_translation__1().x(), -this._get_translation__1().y()), this._get_rotation__1().inverse());
  };
  Pose2d.prototype.hashCode = function () {
    var result = this._translation_.hashCode();
    result = imul(31, result) + this._rotation_.hashCode() | 0;
    return result;
  };
  Pose2d.$metadata$ = {
    simpleName: 'Pose2d',
    kind: 'class',
    interfaces: [IPose2d]
  };
  Object.defineProperty(Pose2d.prototype, 'translation', {
    configurable: true,
    get: Pose2d.prototype._get_translation__1
  });
  Object.defineProperty(Pose2d.prototype, 'rotation', {
    configurable: true,
    get: Pose2d.prototype._get_rotation__1
  });
  Object.defineProperty(Pose2d.prototype, 'pose', {
    configurable: true,
    get: Pose2d.prototype._get_pose__0
  });
  function Pose2dWithCurvature_init_$Init$($this) {
    Pose2dWithCurvature.call($this);
    $this._pose_ = Pose2d_init_$Create$_0();
    $this._curvature = 0.0;
    $this._dCurvatureDs = 0.0;
    return $this;
  }
  function Pose2dWithCurvature_init_$Create$() {
    return Pose2dWithCurvature_init_$Init$(Object.create(Pose2dWithCurvature.prototype));
  }
  function Pose2dWithCurvature_init_$Init$_0(pose, curvature, dcurvature_ds, $this) {
    Pose2dWithCurvature.call($this);
    $this._pose_ = pose;
    $this._curvature = curvature;
    $this._dCurvatureDs = dcurvature_ds;
    return $this;
  }
  function Pose2dWithCurvature_init_$Create$_0(pose, curvature, dcurvature_ds) {
    return Pose2dWithCurvature_init_$Init$_0(pose, curvature, dcurvature_ds, Object.create(Pose2dWithCurvature.prototype));
  }
  function Companion_3() {
    Companion_instance_2 = this;
    this._kIdentity_0 = Pose2dWithCurvature_init_$Create$();
  }
  Companion_3.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 == null)
      new Companion_3();
    return Companion_instance_2;
  }
  Pose2dWithCurvature.prototype._get_pose__0 = function () {
    return this._pose_;
  };
  Pose2dWithCurvature.prototype._get_translation__1 = function () {
    return this._get_pose__0()._get_translation__1();
  };
  Pose2dWithCurvature.prototype._get_rotation__1 = function () {
    return this._get_pose__0()._get_rotation__1();
  };
  Pose2dWithCurvature.prototype.toString = function () {
    return '' + this._get_pose__0() + ', curvature: ' + format(this._curvature, 3) + ', dcurvature_ds: ' + format(this._dCurvatureDs, 3);
  };
  function Pose2dWithCurvature() {
    Companion_getInstance_2();
  }
  Pose2dWithCurvature.$metadata$ = {
    simpleName: 'Pose2dWithCurvature',
    kind: 'class',
    interfaces: [IPose2d, ICurvature]
  };
  function Rotation2d_init_$Init$(x, y, normalize, $mask0, $marker, $this) {
    if (!(($mask0 & 1) === 0))
      x = 1.0;
    if (!(($mask0 & 2) === 0))
      y = 0.0;
    if (!(($mask0 & 4) === 0))
      normalize = false;
    Rotation2d.call($this, x, y, normalize);
    return $this;
  }
  function Rotation2d_init_$Create$(x, y, normalize, $mask0, $marker) {
    return Rotation2d_init_$Init$(x, y, normalize, $mask0, $marker, Object.create(Rotation2d.prototype));
  }
  function Rotation2d_init_$Init$_0($this) {
    Rotation2d_init_$Init$(1.0, 0.0, false, 4, null, $this);
    return $this;
  }
  function Rotation2d_init_$Create$_0() {
    return Rotation2d_init_$Init$_0(Object.create(Rotation2d.prototype));
  }
  function Rotation2d_init_$Init$_1(other, $this) {
    Rotation2d_init_$Init$(other._cos_angle_, other._sin_angle_, false, 4, null, $this);
    return $this;
  }
  function Rotation2d_init_$Create$_1(other) {
    return Rotation2d_init_$Init$_1(other, Object.create(Rotation2d.prototype));
  }
  function Rotation2d_init_$Init$_2(direction, normalize, $this) {
    Rotation2d.call($this, direction.x(), direction.y(), normalize);
    return $this;
  }
  function Rotation2d_init_$Create$_2(direction, normalize) {
    return Rotation2d_init_$Init$_2(direction, normalize, Object.create(Rotation2d.prototype));
  }
  function Companion_4() {
    Companion_instance_3 = this;
    this._kIdentity_1 = Rotation2d_init_$Create$_0();
  }
  Companion_4.prototype.identity = function () {
    return this._kIdentity_1;
  };
  Companion_4.prototype.fromRadians = function (angle_radians) {
    var tmp = Math.cos(angle_radians);
    return new Rotation2d(tmp, Math.sin(angle_radians), false);
  };
  Companion_4.prototype.fromDegrees = function (angle_degrees) {
    return this.fromRadians(toRadians_0(angle_degrees));
  };
  Companion_4.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_3;
  function Companion_getInstance_3() {
    if (Companion_instance_3 == null)
      new Companion_4();
    return Companion_instance_3;
  }
  function Rotation2d(x, y, normalize) {
    Companion_getInstance_3();
    var x_0 = x === void 1 ? 1.0 : x;
    var y_0 = y === void 1 ? 0.0 : y;
    var normalize_0 = normalize === void 1 ? false : normalize;
    if (normalize_0) {
      var magnitude = Math.hypot(x_0, y_0);
      Util_getInstance();
      if (magnitude > 1.0E-12) {
        this._sin_angle_ = y_0 / magnitude;
        this._cos_angle_ = x_0 / magnitude;
      } else {
        {
          this._sin_angle_ = 0.0;
          this._cos_angle_ = 1.0;
        }
      }
    } else {
      this._cos_angle_ = x_0;
      this._sin_angle_ = y_0;
    }
  }
  Rotation2d.prototype.cos = function () {
    return this._cos_angle_;
  };
  Rotation2d.prototype.sin = function () {
    return this._sin_angle_;
  };
  Rotation2d.prototype.tan = function () {
    var tmp;
    var tmp0_abs_0 = this._cos_angle_;
    var tmp_0 = Math.abs(tmp0_abs_0);
    Util_getInstance();
    if (tmp_0 < 1.0E-12) {
      var tmp_1;
      if (this._sin_angle_ >= 0.0) {
        DoubleCompanionObject_getInstance();
        tmp_1 = Infinity;
      } else {
        DoubleCompanionObject_getInstance();
        tmp_1 = -Infinity;
      }
      tmp = tmp_1;
    } else {
      {
        tmp = this._sin_angle_ / this._cos_angle_;
      }
    }
    return tmp;
  };
  Rotation2d.prototype._get_radians_ = function () {
    var tmp0_atan2_0 = this._sin_angle_;
    var tmp1_atan2_0 = this._cos_angle_;
    return Math.atan2(tmp0_atan2_0, tmp1_atan2_0);
  };
  Rotation2d.prototype._get_degrees_ = function () {
    return toDegrees_0(this._get_radians_());
  };
  Rotation2d.prototype.rotateBy = function (other) {
    return new Rotation2d(this._cos_angle_ * other._cos_angle_ - this._sin_angle_ * other._sin_angle_, this._cos_angle_ * other._sin_angle_ + this._sin_angle_ * other._cos_angle_, true);
  };
  Rotation2d.prototype.normal = function () {
    return new Rotation2d(-this._sin_angle_, this._cos_angle_, false);
  };
  Rotation2d.prototype.inverse = function () {
    return new Rotation2d(this._cos_angle_, -this._sin_angle_, false);
  };
  Rotation2d.prototype.isParallel = function (other) {
    var tmp = Util_getInstance();
    var tmp_0 = Companion_getInstance_4().cross(this.toTranslation(), other.toTranslation());
    return tmp.epsilonEquals$default(tmp_0, 0.0, 0.0, 4, null);
  };
  Rotation2d.prototype.toTranslation = function () {
    return new Translation2d(this._cos_angle_, this._sin_angle_);
  };
  Rotation2d.prototype.nearestPole = function () {
    var pole_sin;
    var pole_cos;
    var tmp0_abs_0 = this._cos_angle_;
    var tmp = Math.abs(tmp0_abs_0);
    var tmp1_abs_0 = this._sin_angle_;
    if (tmp > Math.abs(tmp1_abs_0)) {
      var tmp2_sign_0 = this._cos_angle_;
      pole_cos = Math.sign(tmp2_sign_0);
      pole_sin = 0.0;
    } else {
      {
        pole_cos = 0.0;
        var tmp3_sign_0 = this._sin_angle_;
        pole_sin = Math.sign(tmp3_sign_0);
      }
    }
    return new Rotation2d(pole_cos, pole_sin, false);
  };
  Rotation2d.prototype.interpolate_1 = function (other, x) {
    if (x <= 0.0) {
      return Rotation2d_init_$Create$_1(this);
    } else if (x >= 1.0) {
      return Rotation2d_init_$Create$_1(other);
    }var angle_diff = this.inverse().rotateBy(other)._get_radians_();
    return this.rotateBy(Companion_getInstance_3().fromRadians(angle_diff * x));
  };
  Rotation2d.prototype.interpolate_4 = function (other, x) {
    return this.interpolate_1(other instanceof Rotation2d ? other : THROW_CCE(), x);
  };
  Rotation2d.prototype.toString = function () {
    return '(' + format(this._get_degrees_(), 3) + ' deg)';
  };
  Rotation2d.prototype.toCSV_1 = function () {
    return format(this._get_degrees_(), 3);
  };
  Rotation2d.prototype.distance_1 = function (other) {
    return this.inverse().rotateBy(other)._get_radians_();
  };
  Rotation2d.prototype.distance_4 = function (other) {
    return this.distance_1(other instanceof Rotation2d ? other : THROW_CCE());
  };
  Rotation2d.prototype.equals = function (other) {
    var tmp;
    var tmp_0;
    if (other == null) {
      tmp_0 = true;
    } else {
      tmp_0 = !(other instanceof Rotation2d);
    }
    if (tmp_0) {
      tmp = false;
    } else {
      {
        var tmp_1 = this.distance_1(other);
        Util_getInstance();
        tmp = tmp_1 < 1.0E-12;
      }
    }
    return tmp;
  };
  Rotation2d.prototype.hashCode = function () {
    var result = getNumberHashCode(this._cos_angle_);
    result = imul(31, result) + getNumberHashCode(this._sin_angle_) | 0;
    return result;
  };
  Rotation2d.prototype._get_rotation__1 = function () {
    return this;
  };
  Rotation2d.$metadata$ = {
    simpleName: 'Rotation2d',
    kind: 'class',
    interfaces: [IRotation2d]
  };
  Object.defineProperty(Rotation2d.prototype, 'radians', {
    configurable: true,
    get: Rotation2d.prototype._get_radians_
  });
  Object.defineProperty(Rotation2d.prototype, 'degrees', {
    configurable: true,
    get: Rotation2d.prototype._get_degrees_
  });
  Object.defineProperty(Rotation2d.prototype, 'rotation', {
    configurable: true,
    get: Rotation2d.prototype._get_rotation__1
  });
  function fromRadians(angle_radians) {
    return Companion_getInstance_3().fromRadians(angle_radians);
  }
  function fromDegrees(angle_degrees) {
    return Companion_getInstance_3().fromDegrees(angle_degrees);
  }
  function State() {
  }
  State.$metadata$ = {
    simpleName: 'State',
    kind: 'interface',
    interfaces: [Interpolable, CSVWritable]
  };
  function Translation2d_init_$Init$($this) {
    Translation2d.call($this, 0.0, 0.0);
    return $this;
  }
  function Translation2d_init_$Create$() {
    return Translation2d_init_$Init$(Object.create(Translation2d.prototype));
  }
  function Translation2d_init_$Init$_0(other, $this) {
    Translation2d.call($this, other._x, other._y);
    return $this;
  }
  function Translation2d_init_$Create$_0(other) {
    return Translation2d_init_$Init$_0(other, Object.create(Translation2d.prototype));
  }
  function Translation2d_init_$Init$_1(start, end, $this) {
    Translation2d.call($this, end._x - start._x, end._y - start._y);
    return $this;
  }
  function Translation2d_init_$Create$_1(start, end) {
    return Translation2d_init_$Init$_1(start, end, Object.create(Translation2d.prototype));
  }
  function Companion_5() {
    Companion_instance_4 = this;
    this._kIdentity_2 = Translation2d_init_$Create$();
  }
  Companion_5.prototype.identity = function () {
    return this._kIdentity_2;
  };
  Companion_5.prototype.fromPolar = function (direction, magnitude) {
    return new Translation2d(direction.cos() * magnitude, direction.sin() * magnitude);
  };
  Companion_5.prototype.dot = function (a, b) {
    return a._x * b._x + a._y * b._y;
  };
  Companion_5.prototype.getAngle = function (a, b) {
    var cos_angle = this.dot(a, b) / (a.norm() * b.norm());
    var tmp;
    if (isNaN_0(cos_angle)) {
      tmp = Rotation2d_init_$Create$_0();
    } else {
      var tmp_0 = Companion_getInstance_3();
      var tmp1_min_0 = 1.0;
      var tmp0_max_0 = -1.0;
      var tmp2_min_0 = function () {
        var $externalVarargReceiverTmp = Math;
        return $externalVarargReceiverTmp.max.apply($externalVarargReceiverTmp, [].concat([].slice.call(new Float64Array([cos_angle, tmp0_max_0]))));
      }.call(this);
      var tmp3_acos_0 = function () {
        var $externalVarargReceiverTmp = Math;
        return $externalVarargReceiverTmp.min.apply($externalVarargReceiverTmp, [].concat([].slice.call(new Float64Array([tmp1_min_0, tmp2_min_0]))));
      }.call(this);
      tmp = tmp_0.fromRadians(Math.acos(tmp3_acos_0));
    }
    return tmp;
  };
  Companion_5.prototype.cross = function (a, b) {
    return a._x * b._y - a._y * b._x;
  };
  Companion_5.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_4;
  function Companion_getInstance_4() {
    if (Companion_instance_4 == null)
      new Companion_5();
    return Companion_instance_4;
  }
  function Translation2d(x, y) {
    Companion_getInstance_4();
    this._x = x;
    this._y = y;
  }
  Translation2d.prototype.norm = function () {
    var tmp0_hypot_0 = this._x;
    var tmp1_hypot_0 = this._y;
    return Math.hypot(tmp0_hypot_0, tmp1_hypot_0);
  };
  Translation2d.prototype.norm2 = function () {
    return this._x * this._x + this._y * this._y;
  };
  Translation2d.prototype.x = function () {
    return this._x;
  };
  Translation2d.prototype.y = function () {
    return this._y;
  };
  Translation2d.prototype.translateBy = function (other) {
    return new Translation2d(this._x + other._x, this._y + other._y);
  };
  Translation2d.prototype.rotateBy = function (rotation) {
    return new Translation2d(this._x * rotation.cos() - this._y * rotation.sin(), this._x * rotation.sin() + this._y * rotation.cos());
  };
  Translation2d.prototype.direction = function () {
    return new Rotation2d(this._x, this._y, true);
  };
  Translation2d.prototype.inverse = function () {
    return new Translation2d(-this._x, -this._y);
  };
  Translation2d.prototype.interpolate_3 = function (other, x) {
    if (x <= 0.0) {
      return Translation2d_init_$Create$_0(this);
    } else if (x >= 1.0) {
      return Translation2d_init_$Create$_0(other);
    }return this.extrapolate(other, x);
  };
  Translation2d.prototype.interpolate_4 = function (other, x) {
    return this.interpolate_3(other instanceof Translation2d ? other : THROW_CCE(), x);
  };
  Translation2d.prototype.extrapolate = function (other, x) {
    return new Translation2d(x * (other._x - x) + x, x * (other._y - this._y) + this._y);
  };
  Translation2d.prototype.scale = function (s) {
    return new Translation2d(this._x * s, this._y * s);
  };
  Translation2d.prototype.epsilonEquals = function (other, epsilon) {
    return Util_getInstance().epsilonEquals_0(this.x(), other.x(), epsilon) ? Util_getInstance().epsilonEquals_0(this.y(), other.y(), epsilon) : false;
  };
  Translation2d.prototype.toString = function () {
    return '' + '(' + format(this._x, 3) + ',' + format(this._y, 3) + ')';
  };
  Translation2d.prototype.toCSV_1 = function () {
    return format(this._x, 3) + ',' + format(this._y, 3);
  };
  Translation2d.prototype.distance_3 = function (other) {
    return this.inverse().translateBy(other).norm();
  };
  Translation2d.prototype.distance_4 = function (other) {
    return this.distance_3(other instanceof Translation2d ? other : THROW_CCE());
  };
  Translation2d.prototype.equals = function (other) {
    var tmp;
    var tmp_0;
    if (other == null) {
      tmp_0 = true;
    } else {
      tmp_0 = !(other instanceof Translation2d);
    }
    if (tmp_0) {
      tmp = false;
    } else {
      {
        var tmp_1 = this.distance_3(other);
        Util_getInstance();
        tmp = tmp_1 < 1.0E-12;
      }
    }
    return tmp;
  };
  Translation2d.prototype.hashCode = function () {
    var result = getNumberHashCode(this._x);
    result = imul(31, result) + getNumberHashCode(this._y) | 0;
    return result;
  };
  Translation2d.prototype._get_translation__1 = function () {
    return this;
  };
  Translation2d.$metadata$ = {
    simpleName: 'Translation2d',
    kind: 'class',
    interfaces: [ITranslation2d]
  };
  Object.defineProperty(Translation2d.prototype, 'translation', {
    configurable: true,
    get: Translation2d.prototype._get_translation__1
  });
  function Companion_6() {
    Companion_instance_5 = this;
    this._kIdentity_3 = new Twist2d(0.0, 0.0, 0.0);
  }
  Companion_6.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_5;
  function Companion_getInstance_5() {
    if (Companion_instance_5 == null)
      new Companion_6();
    return Companion_instance_5;
  }
  function Twist2d(dx_0, dy_0, dtheta) {
    Companion_getInstance_5();
    this._dx = dx_0;
    this._dy = dy_0;
    this._dtheta = dtheta;
  }
  Twist2d.prototype.scaled = function (scale) {
    return new Twist2d(this._dx * scale, this._dy * scale, this._dtheta * scale);
  };
  Twist2d.prototype.norm_0 = function () {
    var tmp;
    if (this._dy === 0.0) {
      var tmp0_abs_0 = this._dx;
      tmp = Math.abs(tmp0_abs_0);
    } else {
      var tmp1_hypot_0 = this._dx;
      var tmp2_hypot_0 = this._dy;
      tmp = Math.hypot(tmp1_hypot_0, tmp2_hypot_0);
    }
    return tmp;
  };
  Twist2d.prototype.toString = function () {
    return '' + '(' + format(this._dx, 3) + ',' + format(this._dy, 3) + ',' + format(toDegrees_0(this._dtheta), 3) + ' deg)';
  };
  Twist2d.$metadata$ = {
    simpleName: 'Twist2d',
    kind: 'class',
    interfaces: []
  };
  function runOptimizationIteration($this, splines) {
    if (splines._get_size__7() <= 1) {
      return Unit_getInstance();
    }var tmp0_arrayOfNulls_0 = splines._get_size__7() - 1 | 0;
    var controlPoints = fillArrayVal(Array(tmp0_arrayOfNulls_0), null);
    var magnitude = 0.0;
    var inductionVariable = 0;
    var last_1 = splines._get_size__7() - 1 | 0;
    if (inductionVariable < last_1)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (splines.get_13(i)._get_startPose_().isColinear(splines.get_13(i + 1 | 0)._get_startPose_()) ? true : splines.get_13(i)._get_endPose_().isColinear(splines.get_13(i + 1 | 0)._get_endPose_())) {
          continue;
        }var original = $this.sumDCurvature2(splines);
        var temp = splines.get_13(i);
        var temp1 = splines.get_13(i + 1 | 0);
        controlPoints[i] = new ControlPoint();
        splines.set_1(i, QuinticHermiteSpline_init_$Create$_0(temp._x0, temp._x1, temp._dx0, temp._dx1, temp._ddx0, temp._ddx1 + 1.0E-5, temp._y0, temp._y1, temp._dy0, temp._dy1, temp._ddy0, temp._ddy1));
        Unit_getInstance();
        splines.set_1(i + 1 | 0, QuinticHermiteSpline_init_$Create$_0(temp1._x0, temp1._x1, temp1._dx0, temp1._dx1, temp1._ddx0 + 1.0E-5, temp1._ddx1, temp1._y0, temp1._y1, temp1._dy0, temp1._dy1, temp1._ddy0, temp1._ddy1));
        Unit_getInstance();
        ensureNotNull(controlPoints[i])._ddx = ($this.sumDCurvature2(splines) - original) / 1.0E-5;
        splines.set_1(i, QuinticHermiteSpline_init_$Create$_0(temp._x0, temp._x1, temp._dx0, temp._dx1, temp._ddx0, temp._ddx1, temp._y0, temp._y1, temp._dy0, temp._dy1, temp._ddy0, temp._ddy1 + 1.0E-5));
        Unit_getInstance();
        splines.set_1(i + 1 | 0, QuinticHermiteSpline_init_$Create$_0(temp1._x0, temp1._x1, temp1._dx0, temp1._dx1, temp1._ddx0, temp1._ddx1, temp1._y0, temp1._y1, temp1._dy0, temp1._dy1, temp1._ddy0 + 1.0E-5, temp1._ddy1));
        Unit_getInstance();
        ensureNotNull(controlPoints[i])._ddy = ($this.sumDCurvature2(splines) - original) / 1.0E-5;
        splines.set_1(i, temp);
        Unit_getInstance();
        splines.set_1(i + 1 | 0, temp1);
        Unit_getInstance();
        magnitude = magnitude + (ensureNotNull(controlPoints[i])._ddx * ensureNotNull(controlPoints[i])._ddx + ensureNotNull(controlPoints[i])._ddy * ensureNotNull(controlPoints[i])._ddy);
      }
       while (inductionVariable < last_1);
    var tmp1_sqrt_0 = magnitude;
    magnitude = Math.sqrt(tmp1_sqrt_0);
    var p1;
    var p2;
    var p3;
    p2 = new Translation2d(0.0, $this.sumDCurvature2(splines));
    var inductionVariable_0 = 0;
    var last_2 = splines._get_size__7() - 1 | 0;
    if (inductionVariable_0 < last_2)
      do {
        var i_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        if (splines.get_13(i_0)._get_startPose_().isColinear(splines.get_13(i_0 + 1 | 0)._get_startPose_()) ? true : splines.get_13(i_0)._get_endPose_().isColinear(splines.get_13(i_0 + 1 | 0)._get_endPose_())) {
          continue;
        }var tmp2_this = ensureNotNull(controlPoints[i_0]);
        tmp2_this._ddx = tmp2_this._ddx * (1.0 / magnitude);
        var tmp3_this = ensureNotNull(controlPoints[i_0]);
        tmp3_this._ddy = tmp3_this._ddy * (1.0 / magnitude);
        var tmp4_this = splines.get_13(i_0);
        tmp4_this._ddx1 = tmp4_this._ddx1 - ensureNotNull(controlPoints[i_0])._ddx;
        var tmp5_this = splines.get_13(i_0);
        tmp5_this._ddy1 = tmp5_this._ddy1 - ensureNotNull(controlPoints[i_0])._ddy;
        var tmp6_this = splines.get_13(i_0 + 1 | 0);
        tmp6_this._ddx0 = tmp6_this._ddx0 - ensureNotNull(controlPoints[i_0])._ddx;
        var tmp7_this = splines.get_13(i_0 + 1 | 0);
        tmp7_this._ddy0 = tmp7_this._ddy0 - ensureNotNull(controlPoints[i_0])._ddy;
        computeCoefficients(splines.get_13(i_0));
        computeCoefficients(splines.get_13(i_0 + 1 | 0));
      }
       while (inductionVariable_0 < last_2);
    p1 = new Translation2d(-1.0, $this.sumDCurvature2(splines));
    var inductionVariable_1 = 0;
    var last_3 = splines._get_size__7() - 1 | 0;
    if (inductionVariable_1 < last_3)
      do {
        var i_1 = inductionVariable_1;
        inductionVariable_1 = inductionVariable_1 + 1 | 0;
        if (splines.get_13(i_1)._get_startPose_().isColinear(splines.get_13(i_1 + 1 | 0)._get_startPose_()) ? true : splines.get_13(i_1)._get_endPose_().isColinear(splines.get_13(i_1 + 1 | 0)._get_endPose_())) {
          continue;
        }var tmp9_this = splines.get_13(i_1);
        tmp9_this._ddx1 = tmp9_this._ddx1 + 2 * ensureNotNull(controlPoints[i_1])._ddx;
        var tmp10_this = splines.get_13(i_1);
        tmp10_this._ddy1 = tmp10_this._ddy1 + 2 * ensureNotNull(controlPoints[i_1])._ddy;
        var tmp11_this = splines.get_13(i_1 + 1 | 0);
        tmp11_this._ddx0 = tmp11_this._ddx0 + 2 * ensureNotNull(controlPoints[i_1])._ddx;
        var tmp12_this = splines.get_13(i_1 + 1 | 0);
        tmp12_this._ddy0 = tmp12_this._ddy0 + 2 * ensureNotNull(controlPoints[i_1])._ddy;
        computeCoefficients(splines.get_13(i_1));
        computeCoefficients(splines.get_13(i_1 + 1 | 0));
      }
       while (inductionVariable_1 < last_3);
    p3 = new Translation2d(1.0, $this.sumDCurvature2(splines));
    var stepSize = fitParabola($this, p1, p2, p3);
    var inductionVariable_2 = 0;
    var last_4 = splines._get_size__7() - 1 | 0;
    if (inductionVariable_2 < last_4)
      do {
        var i_2 = inductionVariable_2;
        inductionVariable_2 = inductionVariable_2 + 1 | 0;
        if (splines.get_13(i_2)._get_startPose_().isColinear(splines.get_13(i_2 + 1 | 0)._get_startPose_()) ? true : splines.get_13(i_2)._get_endPose_().isColinear(splines.get_13(i_2 + 1 | 0)._get_endPose_())) {
          continue;
        }var tmp14_this = ensureNotNull(controlPoints[i_2]);
        tmp14_this._ddx = tmp14_this._ddx * (1 + stepSize / 1.0);
        var tmp15_this = ensureNotNull(controlPoints[i_2]);
        tmp15_this._ddy = tmp15_this._ddy * (1 + stepSize / 1.0);
        var tmp16_this = splines.get_13(i_2);
        tmp16_this._ddx1 = tmp16_this._ddx1 + ensureNotNull(controlPoints[i_2])._ddx;
        var tmp17_this = splines.get_13(i_2);
        tmp17_this._ddy1 = tmp17_this._ddy1 + ensureNotNull(controlPoints[i_2])._ddy;
        var tmp18_this = splines.get_13(i_2 + 1 | 0);
        tmp18_this._ddx0 = tmp18_this._ddx0 + ensureNotNull(controlPoints[i_2])._ddx;
        var tmp19_this = splines.get_13(i_2 + 1 | 0);
        tmp19_this._ddy0 = tmp19_this._ddy0 + ensureNotNull(controlPoints[i_2])._ddy;
        computeCoefficients(splines.get_13(i_2));
        computeCoefficients(splines.get_13(i_2 + 1 | 0));
      }
       while (inductionVariable_2 < last_4);
  }
  function fitParabola($this, p1, p2, p3) {
    var A = p3.x() * (p2.y() - p1.y()) + p2.x() * (p1.y() - p3.y()) + p1.x() * (p3.y() - p2.y());
    var B = p3.x() * p3.x() * (p1.y() - p2.y()) + p2.x() * p2.x() * (p3.y() - p1.y()) + p1.x() * p1.x() * (p2.y() - p3.y());
    return -B / (2 * A);
  }
  function QuinticHermiteSpline_init_$Init$(p0, p1, $this) {
    Spline.call($this);
    QuinticHermiteSpline.call($this);
    var scale = 1.2 * p0._get_translation__1().distance_3(p1._get_translation__1());
    $this._x0 = p0._get_translation__1().x();
    $this._x1 = p1._get_translation__1().x();
    $this._dx0 = p0._get_rotation__1().cos() * scale;
    $this._dx1 = p1._get_rotation__1().cos() * scale;
    $this._ddx0 = 0.0;
    $this._ddx1 = 0.0;
    $this._y0 = p0._get_translation__1().y();
    $this._y1 = p1._get_translation__1().y();
    $this._dy0 = p0._get_rotation__1().sin() * scale;
    $this._dy1 = p1._get_rotation__1().sin() * scale;
    $this._ddy0 = 0.0;
    $this._ddy1 = 0.0;
    computeCoefficients($this);
    return $this;
  }
  function QuinticHermiteSpline_init_$Create$(p0, p1) {
    return QuinticHermiteSpline_init_$Init$(p0, p1, Object.create(QuinticHermiteSpline.prototype));
  }
  function QuinticHermiteSpline_init_$Init$_0(x0, x1, dx0, dx1, ddx0, ddx1, y0, y1, dy0, dy1, ddy0, ddy1, $this) {
    Spline.call($this);
    QuinticHermiteSpline.call($this);
    $this._x0 = x0;
    $this._x1 = x1;
    $this._dx0 = dx0;
    $this._dx1 = dx1;
    $this._ddx0 = ddx0;
    $this._ddx1 = ddx1;
    $this._y0 = y0;
    $this._y1 = y1;
    $this._dy0 = dy0;
    $this._dy1 = dy1;
    $this._ddy0 = ddy0;
    $this._ddy1 = ddy1;
    computeCoefficients($this);
    return $this;
  }
  function QuinticHermiteSpline_init_$Create$_0(x0, x1, dx0, dx1, ddx0, ddx1, y0, y1, dy0, dy1, ddy0, ddy1) {
    return QuinticHermiteSpline_init_$Init$_0(x0, x1, dx0, dx1, ddx0, ddx1, y0, y1, dy0, dy1, ddy0, ddy1, Object.create(QuinticHermiteSpline.prototype));
  }
  function computeCoefficients($this) {
    $this._ax = -6 * $this._x0 - 3 * $this._dx0 - 0.5 * $this._ddx0 + 0.5 * $this._ddx1 - 3 * $this._dx1 + 6 * $this._x1;
    $this._bx = 15 * $this._x0 + 8 * $this._dx0 + 1.5 * $this._ddx0 - $this._ddx1 + 7 * $this._dx1 - 15 * $this._x1;
    $this._cx = -10 * $this._x0 - 6 * $this._dx0 - 1.5 * $this._ddx0 + 0.5 * $this._ddx1 - 4 * $this._dx1 + 10 * $this._x1;
    $this._dx_0 = 0.5 * $this._ddx0;
    $this._ex = $this._dx0;
    $this._fx = $this._x0;
    $this._ay = -6 * $this._y0 - 3 * $this._dy0 - 0.5 * $this._ddy0 + 0.5 * $this._ddy1 - 3 * $this._dy1 + 6 * $this._y1;
    $this._by = 15 * $this._y0 + 8 * $this._dy0 + 1.5 * $this._ddy0 - $this._ddy1 + 7 * $this._dy1 - 15 * $this._y1;
    $this._cy = -10 * $this._y0 - 6 * $this._dy0 - 1.5 * $this._ddy0 + 0.5 * $this._ddy1 - 4 * $this._dy1 + 10 * $this._y1;
    $this._dy_0 = 0.5 * $this._ddy0;
    $this._ey = $this._dy0;
    $this._fy = $this._y0;
  }
  function dx($this, t) {
    return 5 * $this._ax * t * t * t * t + 4 * $this._bx * t * t * t + 3 * $this._cx * t * t + 2 * $this._dx_0 * t + $this._ex;
  }
  function dy($this, t) {
    return 5 * $this._ay * t * t * t * t + 4 * $this._by * t * t * t + 3 * $this._cy * t * t + 2 * $this._dy_0 * t + $this._ey;
  }
  function ddx($this, t) {
    return 20 * $this._ax * t * t * t + 12 * $this._bx * t * t + 6 * $this._cx * t + 2 * $this._dx_0;
  }
  function ddy($this, t) {
    return 20 * $this._ay * t * t * t + 12 * $this._by * t * t + 6 * $this._cy * t + 2 * $this._dy_0;
  }
  function dddx($this, t) {
    return 60 * $this._ax * t * t + 24 * $this._bx * t + 6 * $this._cx;
  }
  function dddy($this, t) {
    return 60 * $this._ay * t * t + 24 * $this._by * t + 6 * $this._cy;
  }
  function dCurvature2($this, t) {
    var dx2dy2 = dx($this, t) * dx($this, t) + dy($this, t) * dy($this, t);
    var num = (dx($this, t) * dddy($this, t) - dddx($this, t) * dy($this, t)) * dx2dy2 - 3 * (dx($this, t) * ddy($this, t) - ddx($this, t) * dy($this, t)) * (dx($this, t) * ddx($this, t) + dy($this, t) * ddy($this, t));
    return num * num / (dx2dy2 * dx2dy2 * dx2dy2 * dx2dy2 * dx2dy2);
  }
  function sumDCurvature2($this) {
    Companion_getInstance_6();
    var dt = 1.0 / 100;
    var sum = 0.0;
    var t = 0.0;
    while (t < 1.0) {
      sum = sum + dt * dCurvature2($this, t);
      t = t + dt;
    }
    return sum;
  }
  function ControlPoint() {
    this._ddx = 0.0;
    this._ddy = 0.0;
  }
  ControlPoint.$metadata$ = {
    simpleName: 'ControlPoint',
    kind: 'class',
    interfaces: []
  };
  function Companion_7() {
    Companion_instance_6 = this;
    this._kEpsilon = 1.0E-5;
    this._kStepSize = 1.0;
    this._kMinDelta = 0.001;
    this._kSamples = 100;
    this._kMaxIterations = 100;
  }
  Companion_7.prototype.sumDCurvature2 = function (splines) {
    var sum = 0.0;
    var tmp0_iterator = splines.iterator_16();
    while (tmp0_iterator.hasNext_4()) {
      var s = tmp0_iterator.next_4();
      sum = sum + sumDCurvature2(s);
    }
    return sum;
  };
  Companion_7.prototype.optimizeSpline = function (splines) {
    var count = 0;
    var prev = this.sumDCurvature2(splines);
    while (count < 100) {
      runOptimizationIteration(this, splines);
      var current = this.sumDCurvature2(splines);
      if (prev - current < 0.001)
        return current;
      prev = current;
      var tmp0 = count;
      count = tmp0 + 1 | 0;
      Unit_getInstance();
    }
    return prev;
  };
  Companion_7.$metadata$ = {
    simpleName: 'Companion',
    kind: 'object',
    interfaces: []
  };
  var Companion_instance_6;
  function Companion_getInstance_6() {
    if (Companion_instance_6 == null)
      new Companion_7();
    return Companion_instance_6;
  }
  QuinticHermiteSpline.prototype._get_startPose_ = function () {
    return new Pose2d(new Translation2d(this._x0, this._y0), new Rotation2d(this._dx0, this._dy0, true));
  };
  QuinticHermiteSpline.prototype._get_endPose_ = function () {
    return new Pose2d(new Translation2d(this._x1, this._y1), new Rotation2d(this._dx1, this._dy1, true));
  };
  QuinticHermiteSpline.prototype.getPoint_0 = function (t) {
    var x = this._ax * t * t * t * t * t + this._bx * t * t * t * t + this._cx * t * t * t + this._dx_0 * t * t + this._ex * t + this._fx;
    var y = this._ay * t * t * t * t * t + this._by * t * t * t * t + this._cy * t * t * t + this._dy_0 * t * t + this._ey * t + this._fy;
    return new Translation2d(x, y);
  };
  QuinticHermiteSpline.prototype.getVelocity_0 = function (t) {
    var tmp0_hypot_0 = dx(this, t);
    var tmp1_hypot_0 = dy(this, t);
    return Math.hypot(tmp0_hypot_0, tmp1_hypot_0);
  };
  QuinticHermiteSpline.prototype.getCurvature_0 = function (t) {
    var tmp = dx(this, t) * ddy(this, t) - ddx(this, t) * dy(this, t);
    var tmp_0 = dx(this, t) * dx(this, t) + dy(this, t) * dy(this, t);
    var tmp0_sqrt_0 = dx(this, t) * dx(this, t) + dy(this, t) * dy(this, t);
    return tmp / (tmp_0 * Math.sqrt(tmp0_sqrt_0));
  };
  QuinticHermiteSpline.prototype.getDCurvature_0 = function (t) {
    var dx2dy2 = dx(this, t) * dx(this, t) + dy(this, t) * dy(this, t);
    var num = (dx(this, t) * dddy(this, t) - dddx(this, t) * dy(this, t)) * dx2dy2 - 3 * (dx(this, t) * ddy(this, t) - ddx(this, t) * dy(this, t)) * (dx(this, t) * ddx(this, t) + dy(this, t) * ddy(this, t));
    var tmp = dx2dy2 * dx2dy2;
    return num / (tmp * Math.sqrt(dx2dy2));
  };
  QuinticHermiteSpline.prototype.getHeading_0 = function (t) {
    return new Rotation2d(dx(this, t), dy(this, t), true);
  };
  function QuinticHermiteSpline() {
    Companion_getInstance_6();
    this._ax = 0.0;
    this._bx = 0.0;
    this._cx = 0.0;
    this._dx_0 = 0.0;
    this._ex = 0.0;
    this._fx = 0.0;
    this._ay = 0.0;
    this._by = 0.0;
    this._cy = 0.0;
    this._dy_0 = 0.0;
    this._ey = 0.0;
    this._fy = 0.0;
  }
  QuinticHermiteSpline.$metadata$ = {
    simpleName: 'QuinticHermiteSpline',
    kind: 'class',
    interfaces: []
  };
  function Spline() {
  }
  Spline.prototype.getPose2d_0 = function (t) {
    return new Pose2d(this.getPoint_0(t), this.getHeading_0(t));
  };
  Spline.prototype.getPose2dWithCurvature_0 = function (t) {
    return Pose2dWithCurvature_init_$Create$_0(this.getPose2d_0(t), this.getCurvature_0(t), this.getDCurvature_0(t) / this.getVelocity_0(t));
  };
  Spline.$metadata$ = {
    simpleName: 'Spline',
    kind: 'class',
    interfaces: []
  };
  function getSegmentArc($this, s, rv, t0, t1, maxDx, maxDy, maxDTheta) {
    var p0 = s.getPoint_0(t0);
    var p1 = s.getPoint_0(t1);
    var r0 = s.getHeading_0(t0);
    var r1 = s.getHeading_0(t1);
    var transformation = new Pose2d(Translation2d_init_$Create$_1(p0, p1).rotateBy(r0.inverse()), r1.rotateBy(r0.inverse()));
    var twist = Companion_getInstance_1().log(transformation);
    if ((twist._dy > maxDy ? true : twist._dx > maxDx) ? true : twist._dtheta > maxDTheta) {
      getSegmentArc($this, s, rv, t0, (t0 + t1) / 2, maxDx, maxDy, maxDTheta);
      getSegmentArc($this, s, rv, (t0 + t1) / 2, t1, maxDx, maxDy, maxDTheta);
    } else {
      rv.add_5(s.getPose2dWithCurvature_0(t1));
      Unit_getInstance();
    }
  }
  function SplineGenerator() {
    SplineGenerator_instance = this;
    this._kMaxDX = 2.0;
    this._kMaxDY = 0.05;
    this._kMaxDTheta = 0.1;
    this._kMinSampleSize = 1;
  }
  SplineGenerator.prototype.parameterizeSpline = function (s, maxDx, maxDy, maxDTheta, t0, t1) {
    var rv = ArrayList_init_$Create$();
    rv.add_5(s.getPose2dWithCurvature_0(0.0));
    Unit_getInstance();
    var dt = t1 - t0;
    var t = 0.0;
    while (t < t1) {
      getSegmentArc(this, s, rv, t, t + dt / 1, maxDx, maxDy, maxDTheta);
      t = t + dt / 1;
    }
    return rv;
  };
  SplineGenerator.prototype.parameterizeSpline$default = function (s, maxDx, maxDy, maxDTheta, t0, t1, $mask0, $handler) {
    if (!(($mask0 & 2) === 0))
      maxDx = 2.0;
    if (!(($mask0 & 4) === 0))
      maxDy = 0.05;
    if (!(($mask0 & 8) === 0))
      maxDTheta = 0.1;
    if (!(($mask0 & 16) === 0))
      t0 = 0.0;
    if (!(($mask0 & 32) === 0))
      t1 = 1.0;
    return this.parameterizeSpline(s, maxDx, maxDy, maxDTheta, t0, t1);
  };
  SplineGenerator.prototype.parameterizeSplines = function (splines) {
    return this.parameterizeSplines_0(splines, 2.0, 0.05, 0.1);
  };
  SplineGenerator.prototype.parameterizeSplines_0 = function (splines, maxDx, maxDy, maxDTheta) {
    var rv = ArrayList_init_$Create$();
    if (splines.isEmpty_6())
      return rv;
    rv.add_5(splines.get_13(0).getPose2dWithCurvature_0(0.0));
    Unit_getInstance();
    var tmp0_iterator = splines.iterator_16();
    while (tmp0_iterator.hasNext_4()) {
      var s = tmp0_iterator.next_4();
      var samples = this.parameterizeSpline$default(s, maxDx, maxDy, maxDTheta, 0.0, 0.0, 48, null);
      rv.addAll_2(drop(samples, 1));
      Unit_getInstance();
    }
    return rv;
  };
  SplineGenerator.$metadata$ = {
    simpleName: 'SplineGenerator',
    kind: 'object',
    interfaces: []
  };
  var SplineGenerator_instance;
  function SplineGenerator_getInstance() {
    if (SplineGenerator_instance == null)
      new SplineGenerator();
    return SplineGenerator_instance;
  }
  function CSVWritable() {
  }
  CSVWritable.$metadata$ = {
    simpleName: 'CSVWritable',
    kind: 'interface',
    interfaces: []
  };
  function Interpolable() {
  }
  Interpolable.$metadata$ = {
    simpleName: 'Interpolable',
    kind: 'interface',
    interfaces: []
  };
  function Util() {
    Util_instance = this;
    this._kEpsilon_0 = 1.0E-12;
  }
  Util.prototype.epsilonEquals_0 = function (a, b, epsilon) {
    return a - epsilon <= b ? a + epsilon >= b : false;
  };
  Util.prototype.epsilonEquals$default = function (a, b, epsilon, $mask0, $handler) {
    if (!(($mask0 & 4) === 0))
      epsilon = 1.0E-12;
    return this.epsilonEquals_0(a, b, epsilon);
  };
  Util.$metadata$ = {
    simpleName: 'Util',
    kind: 'object',
    interfaces: []
  };
  var Util_instance;
  function Util_getInstance() {
    if (Util_instance == null)
      new Util();
    return Util_instance;
  }
  function toDegrees_0(radians) {
    return radians * 57.29577951308232;
  }
  function toRadians_0(degrees) {
    return degrees * 0.017453292519943295;
  }
  function format(_this_, places) {
    var tmp = _this_.toFixed(places);
    return (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
  }
  function calcSplines_0(points) {
    var mQuinticHermiteSplines = ArrayList_init_$Create$();
    var mSplines = ArrayList_init_$Create$();
    var positions = ArrayList_init_$Create$();
    if (points.length < 2) {
      return 'no';
    } else {
      var inductionVariable = 0;
      var last_1 = points.length - 1 | 0;
      if (inductionVariable < last_1)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          mQuinticHermiteSplines.add_5(QuinticHermiteSpline_init_$Create$(points[i], points[i + 1 | 0]));
          Unit_getInstance();
        }
         while (inductionVariable < last_1);
      Companion_getInstance_6().optimizeSpline(mQuinticHermiteSplines);
      Unit_getInstance();
      var tmp1_iterator = mQuinticHermiteSplines.iterator_16();
      while (tmp1_iterator.hasNext_4()) {
        var mQuinticHermiteSpline = tmp1_iterator.next_4();
        mSplines.add_5(mQuinticHermiteSpline);
        Unit_getInstance();
      }
      positions.addAll_2(SplineGenerator_getInstance().parameterizeSplines(mSplines));
      Unit_getInstance();
    }
    var json = new StringBuilder('{"points":[');
    var tmp2_iterator = positions.iterator_16();
    while (tmp2_iterator.hasNext_4()) {
      var pose = tmp2_iterator.next_4();
      json.append_3(poseToJSON(pose)).append_3(',');
      Unit_getInstance();
    }
    return json.substring(0, json._get_length_() - 1 | 0) + ']}';
  }
  function poseToJSON(pose) {
    var x = pose._get_translation__1().x();
    var y = pose._get_translation__1().y();
    var rotation = pose._get_rotation__1()._get_radians_();
    var curvature = pose._curvature;
    return '' + '{"x":' + x + ', "y":' + y + ', "rotation":' + rotation + ', "curvature":' + curvature + '}';
  }
  AbstractMutableList.prototype.get_13 = List.prototype.get_13;
  KClassImpl.prototype._get_simpleName__2 = KClass.prototype._get_simpleName__2;
  output = output$init$();
  functionClasses = functionClasses$init$();
  buf = new ArrayBuffer(8);
  bufFloat64 = bufFloat64$init$();
  bufInt32 = bufInt32$init$();
  lowIndex = lowIndex$init$();
  highIndex = 1 - lowIndex | 0;
  ZERO = fromInt(0);
  ONE = fromInt(1);
  NEG_ONE = fromInt(-1);
  MAX_VALUE = new Long(-1, 2147483647);
  MIN_VALUE = new Long(0, -2147483648);
  TWO_PWR_24_ = fromInt(16777216);
  var $com = _.com || (_.com = {});
  var $com$team751 = $com.team751 || ($com.team751 = {});
  var $com$team751$lib = $com$team751.lib || ($com$team751.lib = {});
  var $com$team751$lib$geometry = $com$team751$lib.geometry || ($com$team751$lib.geometry = {});
  $com$team751$lib$geometry.Pose2d = Pose2d;
  $com$team751$lib$geometry.Pose2d.identity = Pose2d_init_$Create$_0;
  $com$team751$lib$geometry.Pose2d.fromXYRotation = Pose2d_init_$Create$_1;
  $com$team751$lib$geometry.Pose2d.fromTriple = Pose2d_init_$Create$_2;
  $com$team751$lib$geometry.Pose2d.copyOf = Pose2d_init_$Create$_3;
  $com$team751$lib$geometry.Rotation2d = Rotation2d;
  $com$team751$lib$geometry.Rotation2d.identity = Rotation2d_init_$Create$_0;
  $com$team751$lib$geometry.Rotation2d.copyOf = Rotation2d_init_$Create$_1;
  $com$team751$lib$geometry.Rotation2d.fromTranslation = Rotation2d_init_$Create$_2;
  $com$team751$lib$geometry.Rotation2d_fromRadians = fromRadians;
  $com$team751$lib$geometry.Rotation2d_fromDegrees = fromDegrees;
  $com$team751$lib$geometry.Translation2d = Translation2d;
  $com$team751$lib$geometry.Translation2d.identity = Translation2d_init_$Create$;
  $com$team751$lib$geometry.Translation2d.copyOf = Translation2d_init_$Create$_0;
  $com$team751$lib$geometry.Translation2d.delta = Translation2d_init_$Create$_1;
  _.calcSplines = calcSplines_0;
  return _;
}));
