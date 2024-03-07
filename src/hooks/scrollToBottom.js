import { useEffect } from 'react'
import { animateScroll } from 'react-scroll'

const useScrollToBottom = (containerId) => {
  useEffect(() => {
    const container = document.getElementById(containerId)

    if (container) {
      // Scroll to the bottom of the container
      animateScroll.scrollToBottom({
        containerId,
        duration: 500, // You can adjust the duration as needed
      })
    }
  }, [containerId])
}

export default useScrollToBottom
