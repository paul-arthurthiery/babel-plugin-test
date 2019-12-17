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
  } catch (Error, e){
    return e;
  } catch(TypeError, f) {
    return f;
  }
}
