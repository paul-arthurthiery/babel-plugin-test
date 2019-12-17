function a() {
  try {
    return true;
  } catch (e) {
    return e;
  }
}

function b() {
  try {
    return true;
  } catch {
    return false;
  }
}

function c() {
  try {
    return 8;
  } catch (e) {
    if (e.constructor.name === "Error") {
      return e;
    }

    if (e.constructor.name === "TypeError") {
      return e;
    }
  }
}
