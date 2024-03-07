import { Avatar } from '@mui/material'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSetupImageUrl } from '../../../store/reducers/chat_reducer'

function ImagePreview({ setSelectedImage, image }) {
  const dispatch = useDispatch()
  const setupImageUrl = useSelector((state) => state.chat.setupImageUrl)
  // const {} = useSelector((state) => state.chat)
  const fileInputRef = useRef(null)

  console.log('IMAGE FROM profile', image)
  console.log('IMAGE FROM URL', setupImageUrl)

  const handleImageChange = (e) => {
    const file = e.target.files
    setSelectedImage(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file[0])
      dispatch(setSetupImageUrl(imageUrl))
    }
  }

  const handleIconClick = () => {
    fileInputRef.current.click()
  }
  // if (image) dispatch(setSetupImageUrl(null))

  return (
    <div className="flex items-center gap-3 h-[60px] w-[60px] rounded-full border-[2px] relative">
      <Avatar
        src={setupImageUrl || image}
        alt=""
        sx={{ height: '60px', width: '60px' }}
      />

      <div className="absolute h-full w-full left-0 cursor-pointer top-0 rounded-full flex items-end p-[1rem] justify-center">
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="bg-[#DAEBFF] rounded-md border-none text-sm hidden"
        />
      </div>

      <p
        onClick={handleIconClick}
        className="text-[#2D80E0] font-semibold text-sm min-w-max cursor-pointer"
      >
        Click to upload avatar
      </p>
    </div>
  )
}

export default ImagePreview
