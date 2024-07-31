import { Button } from "antd"
import { useRef } from "react"
import { useState } from "react"

const initSecond = 60
let timr = null

export default function SecondDown() {
  const [second, setSecond] = useState(0)
  const init = useRef(initSecond)
  const sendCaptcha = async () => {
    if (second !== 0) return

    // 倒计时
    init.current = initSecond
    setSecond(init.current)
    timr = setTimeout(startDown, 1000)
  }

  const startDown = () => {
    if (init.current > 0) {
      init.current--
      setSecond(init.current)
      timr = setTimeout(startDown, 1000)
    } else {
      clearTimeout(timr)
    }
  }

  
  return (
    <div>
      {second === 0 ? (
        <Button style={{ width: 100 }} type="primary" onClick={sendCaptcha}>
          发送验证码
        </Button>
      ) : (
        <Button style={{ width: 100 }} disabled type="primary">
          {second}
        </Button>
      )}
    </div>
  )
}
