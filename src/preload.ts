export function preloadImages() {
  for (const f of generateFileNames()) {
    const img = new Image();
    img.src = f;
  }
}

function generateFileNames() {
  let f = [];
  for (let i = 1; i <= 13; i++) {
    let n = `${i}`;
    if (i === 1) n = "A";
    if (i > 10) n = ["J", "Q", "K"][i - 11];
    for (const suit of ["H", "C", "D", "S"]) {
      f.push(`card/${n}${suit}.jpg`);
    }
  }
  return f;
}
