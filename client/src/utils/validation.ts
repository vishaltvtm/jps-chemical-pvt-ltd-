    //----validation
    function extractValidNumber(val:any) {
  let str = String(val || "").trim();

  // remove %
  let number = str.replace('%', '');

  // validate
  return /^\d+$/.test(number) ? number : "";
}

export {extractValidNumber}