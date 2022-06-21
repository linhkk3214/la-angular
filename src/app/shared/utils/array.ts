var sort_by;

(function () {
  const defaultCompareFunc = function (a, b) {
    if (a == b) return 0;
    return a < b ? -1 : 1;
  };
  const getCompareFunc = function (primer, reverse) {
    const defaultCompare = defaultCompareFunc;
    let compare = defaultCompareFunc;
    if (primer) {
      compare = function (a, b) {
        return defaultCompare(primer(a), primer(b));
      };
    }
    if (reverse) {
      return function (a, b) {
        return -1 * compare(a, b);
      };
    }
    return compare;
  };

  sort_by = function (...args) {
    const fields = [],
      n_fields = args.length;
    let field, name, cmp;

    // preprocess sorting options
    for (let i = 0; i < n_fields; i++) {
      field = args[i];
      if (typeof field === 'string') {
        name = field;
        cmp = defaultCompareFunc;
      }
      else {
        name = field.name;
        cmp = getCompareFunc(field.primer, field.reverse);
      }
      fields.push({
        name: name,
        cmp: cmp
      });
    }

    // final comparison function
    return function (A, B) {
      let name, result;
      for (let i = 0; i < n_fields; i++) {
        result = 0;
        field = fields[i];
        name = field.name;

        result = field.cmp(A[name], B[name]);
        if (result !== 0) break;
      }
      return result;
    };
  };
}());

// multipleSort('idTinhThanh', 'idQuanHuyen')
// multipleSort({name: 'idTinhThanh', reverse: true}, 'idQuanHuyen')
// multipleSort({name: 'soThuTu', primer: parseInt}, 'idQuanHuyen') // parseInt là function
export const multipleSort = sort_by;

