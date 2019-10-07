if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i);
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
     }

    return resArray;
  };
}

if (!Object.values) {
  Object.values = function values(O) {
	   return reduce(ownKeys(O), function (v, k) { return concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []) }, [])
  }
}
