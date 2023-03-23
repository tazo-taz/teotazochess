import { useEffect, useRef, useState, useCallback, useReducer } from "react"

export const useToggle = <T extends {}>(arr: T[], value?: T) => {

  const setStateWithValue = useCallback((value: any) => {
    if (value === undefined) return 0
    if (arr.includes(value)) return arr.indexOf(value)
    return 0
  }, [arr])

  const [state, setState] = useState(() => setStateWithValue(value))

  const toggleState = (valuee: any = "qweqewqweeqwqwewqedsadadsa") => {


    if (valuee !== "qweqewqweeqwqwewqedsadadsa") setState(() => setStateWithValue(valuee))
    else {
      let newState = state + 1
      if (newState >= arr.length) newState = 0

      setState(newState)
    }
  }

  useEffect(() => {
    setState(() => setStateWithValue(value))
  }, [])

  return [arr[state], toggleState] as const
}

interface IUseStopwatch {
  speed?: number,
  autoStart?: boolean,
}

export const useStopwatch = ({ speed = 1000, autoStart = true }: IUseStopwatch = {}) => {
  const { state, increment, setCounter } = useCounter(0)
  let interval = useRef<any>()

  const stop = useCallback(() => { clearInterval(interval.current) }, [])

  const resume = useCallback(() => {
    interval.current = setInterval(() => {
      increment()
    }, speed)
  }, [increment, speed])

  useEffect(() => {
    autoStart && resume()
    return stop
  }, [stop, resume])

  return { seconds: state, stop, resume, setCounter }
}

export const useTimer = (second: number) => {
  const [time, setTime] = useState(second)
  const interval = useRef<any>()

  const stop = useCallback(() => clearInterval(interval.current), [])

  const resume = useCallback(() => {
    stop()
    interval.current = setInterval(() => {
      setTime(time => {
        return time - 1
      })
    }, 1000)
  }, [stop])

  const reset = useCallback(() => {
    setTime(second)
  }, [second])


  useEffect(() => {
    if (time <= 0) stop()
  }, [time, stop])

  useEffect(() => {
    setTime(second)
  }, [second])

  return { seconds: time, resume, reset, stop }
}

export const useTimerCB = (show: boolean, setIsShown: any, timer: number = 5000) => {
  let interval = useRef<any>()

  useEffect(() => {
    clearTimeout(interval.current)
    setIsShown(show)
    if (show === true) interval.current = setTimeout(() => {
      setIsShown(false)

    }, timer)
    return () => clearTimeout(interval.current)

  }, [show, timer])
}

export const useBoolean = (value: boolean = false) => {
  const [boolean, toggleBoolean] = useToggle<boolean>([true, false], value)
  return [boolean, toggleBoolean] as const
}

export const useDidMountEffect = (func: Function, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}

export const useSceenSize = () => {
  const [value, setValue] = useState({ x: 0, y: 0 })

  const onResize = useCallback(() => {
    const { clientWidth, clientHeight } = document.documentElement
    setValue({
      x: clientWidth,
      y: clientHeight
    })
  }, [])

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()
    return () => window.removeEventListener("resize", onResize)
  }, [onResize])
  return value
}

export const useLocalStorage = (hash: string, defaultValue?: string) => {
  const [state, setState] = useState("")

  const updateInLS = useCallback((state: any) => window.localStorage.setItem(hash, state), [hash])
  const getValue = useCallback(() => window.localStorage.getItem(hash), [hash])

  const onChange = useCallback((value: any) => {
    setState(value)
  }, [])

  useEffect(() => {
    const LSvalue = getValue()

    if (LSvalue) setState(LSvalue)
    else if (defaultValue) onChange(defaultValue)

  }, [defaultValue, getValue, onChange])

  useEffect(() => {
    state && updateInLS(state)
  }, [state, updateInLS])

  return [state, onChange] as const
}

export const useSessionStorage = (hash: string, defaultValue?: string) => {
  const [state, setState] = useState("")

  const updateInLS = useCallback((state: any) => window.sessionStorage.setItem(hash, state), [])
  const getValue = useCallback(() => window.sessionStorage.getItem(hash), [hash])

  const onChange = useCallback((value: any) => {
    updateInLS(value)
    setState(value)
  }, [])

  useEffect(() => {
    const LSvalue = getValue()

    if (LSvalue) setState(LSvalue)
    else if (defaultValue) onChange(defaultValue)

  }, [defaultValue, getValue, onChange])

  return [state, onChange] as const
}

export const useDelay = (state: any, cb: Function, seconds: number = 1000) => {
  const interval = useRef<any>()
  useEffect(() => {
    clearInterval(interval.current)
    interval.current = setTimeout(() => {
      cb()
    }, seconds)

    return () => clearInterval(interval.current)

  }, [state, seconds])

  return
}

export const useStateWithRef = (state: any) => {
  const ref = useRef<any>()
  useEffect(() => {
    ref.current = state
  }, [state])

  return ref
}

interface State<T> {
  data?: T
  error?: Error,
  loading?: Boolean
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

export function useFetch<T = unknown>(url?: string, options?: RequestInit): [State<T>, (shoudLoad?: boolean) => Promise<void>] {
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: true
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload, loading: false }
      case 'error':
        return { ...initialState, error: action.payload, loading: false }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const fetchData = async (shoudLoad: boolean = true) => {

    if (!url) return

    shoudLoad && dispatch({ type: 'loading' })

    // If a cache exists for this url, return it
    // if (cache.current[url]) {
    //   dispatch({ type: 'fetched', payload: cache.current[url] })
    //   return
    // }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = (await response.json()) as T
      cache.current[url] = data
      if (cancelRequest.current) return

      dispatch({ type: 'fetched', payload: data })
    } catch (error) {
      if (cancelRequest.current) return

      dispatch({ type: 'error', payload: error as Error })
    }
  }

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return

    cancelRequest.current = false

    void fetchData()

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return [state, fetchData]
}

export interface counterOptionsInterface {
  min?: number,
  max?: number
}

export const useCounter = (value: number = 0, { min, max }: counterOptionsInterface = {}) => {
  const [state, setState] = useState(value)

  const increment = useCallback(() => {
    setState((state) => {
      const newState = state + 1

      if (max !== undefined && max < newState) return state
      return newState
    })
  }, [max])

  const decrement = useCallback(() => {
    setState((state) => {
      const newState = state - 1

      if (min !== undefined && newState < min) return state
      return state - 1
    })
  }, [min])

  const setCounter = useCallback((value: number) => setState(value), [])

  useEffect(() => {
    setState(value)
  }, [value])

  return {
    state, increment, decrement, setCounter
  }
}

const customHooks = {
  useToggle,
  useTimer,
  useTimerCB,
  useBoolean,
  useDidMountEffect,
  useSceenSize,
  useLocalStorage,
  useSessionStorage,
  useDelay,
  useStateWithRef,
  useFetch
}

export default customHooks