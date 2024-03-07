const MesageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="64"
      viewBox="0 0 65 64"
      fill="none"
    >
      <g filter="url(#filter0_d_291_505)">
        <path
          d="M52.3 0H6.7C3.55645 0 1 2.5412 1 5.66601V39.6621C1 42.7869 3.55645 45.3281 6.7 45.3281H15.25V56L33.1395 45.3281H52.3C55.4436 45.3281 58 42.7869 58 39.6621V5.66601C58 2.5412 55.4436 0 52.3 0ZM52.3 39.6621H31.5605L20.95 45.9882V39.6621H6.7V5.66601H52.3V39.6621Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_291_505"
          x="0"
          y="0"
          width="65"
          height="64"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="3" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_291_505"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_291_505"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default MesageIcon
