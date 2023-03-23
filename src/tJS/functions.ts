interface options {
  max?: number,
  min?: number,
}

export const mergeClassNames = (...args: any[]) => args.filter(a => a).map(a => String(a).trim()).filter(a => a).join(" ")

export const inputUpdate = (setState: Function, options: options = {}) => (e: any) => {
  const { value } = e.target
  const { max, min } = options

  if (max && value.length > max) return
  if (min && value.length < min) return

  setState(e.target.value)
}

export const copy = (str: any) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    (document.getSelection()?.rangeCount || 0) > 0
      ? document.getSelection()?.getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(selected);
  }
};

export const randomFrom = (arr: string | []) => arr[Math.floor(Math.random() * arr.length)]

export const generateHash = (length: number = 6) => {
  let symbols = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()_"
  let hash = ""
  for (let i = 0; i < length; i++) {
    hash += randomFrom(symbols)
  }
  return hash
}

export const atLeast = (str: any, count: number, symbol: any, fromTop: boolean = true) => {
  str = String(str)
  const toAdd = count - str.length
  if (toAdd > 0) {
    str = str.padStart(count, String(symbol))
  }
  return str
}

export const parseSeconds = (allSeconds: number) => {
  const seconds = atLeast(allSeconds % 60, 2, "0")
  const minutes = atLeast(Math.floor(allSeconds / 60), 2, "0")

  return `${minutes}:${seconds}`
}

export const uniqueArr = (arr: any[]) => [...(new Set(arr))]

const functions = {
  mergeClassNames,
  inputUpdate,
  copy,
  randomFrom,
  generateHash,
  parseSeconds,
  uniqueArr
}

export default functions