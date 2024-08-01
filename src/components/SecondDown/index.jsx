import { Button } from "antd"
import { useRef } from "react"
import { useState } from "react"

const initSecond = 60
let timr = null

/**
 * 
 * @param {onComplete} () => Promise<boolean> 
 * @returns Promise<boolean> 
 */
export default function SecondDown({ onComplete }) {
  const [second, setSecond] = useState(0)
  const init = useRef(initSecond)
  const sendCaptcha = async () => {
    if (second !== 0) return

    // 执行点击逻辑 是否成功发送验证码 决定是否倒计时
    const flag = await onComplete?.()
    if (!flag) return

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
