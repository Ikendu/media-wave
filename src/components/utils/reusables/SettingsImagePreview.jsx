import { Avatar } from '@mui/material'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSettingsImageUrl } from '../../../store/reducers/chat_reducer'

function SettiingsImagePreview({ setSelectedImage, image }) {
  const dispatch = useDispatch()
  const settingsImageUrl = useSelector((state) => state.chat.settingsImageUrl)
  const fileInputRef = useRef(null)

  // console.log(`IMAGE FOR COMPANY`, image)
  // console.log(`IMAGE From redux`, settingsImageUrl)

  const handleImageChange = (e) => {
    const file = e.target.files
    setSelectedImage(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file[0])

      dispatch(setSettingsImageUrl(imageUrl))
      //console.log('File', file)
    }
  }

  const handleIconClick = () => {
    fileInputRef.current.click()
  }
  // if (image) dispatch(setSettingsImageUrl(null))

  return (
    <div className="flex items-center gap-3 h-[100px] w-[140px] rounded-md bg-[#9C9B9B] relative">
      <Avatar
        src={settingsImageUrl || image}
        sx={{ height: '100px', width: '140px' }}
        variant="rounded"
      />

      <div
        onClick={handleIconClick}
        className="absolute h-full w-full left-0 cursor-pointer top-0 rounded-full flex items-end p-[1rem] justify-center"
      >
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="bg-[#DAEBFF] rounded-md border-none text-sm hidden"
        />
      </div>

      {/* <p
        onClick={handleIconClick}
        className="text-[#2D80E0] font-semibold text-sm min-w-max cursor-pointer"
      >
        Click to upload avatar
      </p> */}
    </div>
  )
}

export default SettiingsImagePreview
