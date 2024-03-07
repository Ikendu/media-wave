import { CloseRounded } from '@mui/icons-material'
import { Box, Modal, Switch } from '@mui/material'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { setOperators } from '../../../store/reducers/dashboard_reducer'
import modalStyles from '../../common/ModalStyles'
import AvatarIcon from '../../utils/icons/AvatarIcon'

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}))

const OperatorSettings = () => {
  const [open, setOpen] = useState(false)
  const [openEditOperator, setOpenEditOperator] = useState({
    status: false,
    currentOperatorRole: '',
    currentOperatorName: '',
    currentOperatorEmail: '',
    currentOperatorCompanyId: '',
  })
  const [addDept, setAddDept] = useState('')
  const [addOperatorInfo, setAddOperatorInfo] = useState({
    email: '',
    permission: '',
  })

  const roles = ['admin', 'owner', 'agent']
  const dispatch = useDispatch()

  const cookie = new Cookies()

  const companyId = cookie.get('company')?.id

  const { data: operators } = useSWR(`companies/${companyId}/teammates`)
  const { data: departments } = useSWR(`companies/${companyId}/departments`)

  const createOperator = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        `companies/${companyId}/teammates/add/`,
        {
          email: addOperatorInfo.email,
          role: addOperatorInfo.permission,
          department: addDept,
        }
      )

      setAddOperatorInfo({ email: '', permission: '' })
      handleClose()
    } catch (err) {
      console.log(err)
    }
  }

  const updateOperator = async (e) => {
    e.preventDefault()

    console.log(openEditOperator)

    try {
      const response = await axios.put(
        `companies/${openEditOperator?.currentOperatorCompanyId}/teammates/update`,
        {
          email: openEditOperator?.currentOperatorEmail,
          role: openEditOperator?.currentOperatorRole,
        }
      )

      console.log('**', response.data)
      setOpenEditOperator({ status: false })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteOperator = async () => {
    try {
      await axios.post(
        `companies/${openEditOperator?.currentOperatorCompanyId}/teammates/delete/`,
        {
          email: openEditOperator?.currentOperatorEmail,
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    dispatch(setOperators(operators))
  }, [dispatch, operators])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="px-6 -pt-10 space-y-10">
        <div className="flex items-center justify-between border-b border-gray-300 py-3">
          <div className="text-[#030229] opacity-70 font-semibold lg:text-lg">
            Operators
          </div>
          <button
            className="flex justify-center items-center text-[#2D80E0] py-2 px-5 lg:text-sm font-semibold border border-[#2D80E0] rounded-md outline-none"
            onClick={handleOpen}
          >
            Add an operator
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <div className="space-y-8 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-0 right-0 border w-10 cursor-pointer h-10 rounded-full bg-white shadow-md"
                >
                  <CloseRounded />
                </button>{' '}
                <p className="flex justify-center items-center pt-5 text-2xl">
                  {' '}
                  Add an operator
                </p>
                <div className="w-full">
                  <input
                    value={addOperatorInfo.email}
                    onChange={(e) =>
                      setAddOperatorInfo({ email: e.target.value })
                    }
                    type="Email"
                    placeholder="Email"
                    className="w-full border p-2 rounded-md outline-none pl-3"
                  />
                </div>
                <select
                  className="w-full p-2 bg-transparent border shadow-md pl-2 rounded-md relative"
                  onChange={(e) => setAddDept(e.target.value)}
                >
                  {departments &&
                    departments?.map((dept) => (
                      <>
                        <option value={dept?.id}>{dept?.name}</option>
                      </>
                    ))}

                  <option value="Department name" selected hidden>
                    Department name
                  </option>
                </select>
                <div className="relative">
                  <p className="text-xs absolute -top-2 left-5 text-[#2D80E0] bg-white">
                    Permissions
                  </p>
                  <select
                    className="w-full p-2 bg-transparent border shadow-md pl-2 rounded-md"
                    onChange={(e) =>
                      setAddOperatorInfo({
                        ...addOperatorInfo,
                        permission: e.target.value,
                      })
                    }
                  >
                    <option value="admin" className="opacity-70">
                      Admin
                    </option>
                    <option value="owner" className="opacity-70">
                      Owner
                    </option>
                    <option value="agent" className="opacity-70">
                      Agent
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-6 justify-center items-center pb-6">
                <button
                  onClick={createOperator}
                  className="flex justify-center items-center text-white px-6 p-2 lg:text-sm  bg-[#2D80E0] rounded-md outline-none"
                >
                  Add
                </button>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="border  pb-0 relative w-full border-[#705D5D] rounded-md p-3 px-0 lg:text-xl font-normal">
          <div className="flex justify-between items-center w-full opacity-70 text-[#705D5D] pb-4">
            <p className="w-[100px] pl-[3.4rem]">Name</p>
            <p className="w-[390px]">Role</p>
          </div>

          {operators?.team &&
            operators?.team?.map((operator) => (
              <>
                <hr className="absolute left-0 right-0 h-[0.5px]" />
                <div className="w-full pt-2 hover:bg-[#DDEBFA] group flex justify-between items-center">
                  <button
                    className="flex w-[60%]  justify-between items-center"
                    onClick={() => {
                      setOpenEditOperator({
                        status: true,
                        currentOperatorRole: operator?.role,
                        currentOperatorName: operator?.user?.name,
                        currentOperatorCompanyId: operator?.company,
                        currentOperatorEmail: operator?.user?.email,
                      })
                    }}
                  >
                    <div className="flex items-center gap-3 py-3 pl-10 w-[400px]">
                      <AvatarIcon className="w-[50px] h-[50px]" />
                      <div className="flex flex-col justify-center items-start">
                        <p className="lg:text-lg">
                          {operator?.user?.name}{' '}
                          {operator?.role == 'owner' && (
                            <span className="opacity-50 text-sm">(you)</span>
                          )}
                        </p>
                        <p className="lg:text-sm">{operator?.user?.email}</p>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-lg slg:text-lg text-left">
                        {operator?.role}
                      </p>
                    </div>
                  </button>
                  <div className="flex gap-4 pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex justify-center items-center px-6 lg:text-sm  border border-[#2D80E0] rounded-md outline-none p-2">
                      Deactivate
                    </button>
                    <button
                      onClick={() => {
                        setOpenEditOperator({
                          currentOperatorCompanyId: operator?.company,
                          currentOperatorEmail: operator?.user?.email,
                        })
                        deleteOperator()
                      }}
                      className="flex justify-center items-center text-white px-6 p-2 lg:text-sm  bg-[#2D80E0] rounded-md outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ))}

          {operators?.invite &&
            operators?.invite?.map((operator) => (
              <>
                <hr className="absolute left-0 right-0 h-[0.5px]" />
                <div className="hover:bg-[#DDEBFA] group w-full pt-2 flex justify-between items-center">
                  <button
                    className="flex w-[60%] justify-between items-center"
                    onClick={() => {
                      setOpenEditOperator({
                        status: true,
                        currentOperatorRole: operator?.role,
                        currentOperatorEmail: operator?.email,
                      })
                    }}
                  >
                    <div className="flex items-center gap-3 py-3 pl-10 w-[400px]">
                      <AvatarIcon className="w-[40px] h-[40px]" />
                      <div className="flex flex-col justify-center items-start">
                        <p className="lg:text-lg">{operator?.user?.name} </p>
                        <p className="lg:text-sm">{operator?.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg slg:text-lg text-left">
                        {operator?.role}
                      </p>
                    </div>
                  </button>
                  <div className="flex gap-4 pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex justify-center items-center px-6 lg:text-sm  border border-[#2D80E0] rounded-md outline-none p-2">
                      Deactivate
                    </button>
                    <button
                      onClick={() => {
                        setOpenEditOperator({
                          currentOperatorCompanyId: operator?.company,
                          currentOperatorEmail: operator?.email,
                        })
                        deleteOperator()
                      }}
                      className="flex justify-center items-center text-white px-6 p-2 lg:text-sm  bg-[#2D80E0] rounded-md outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ))}

          <Modal
            open={openEditOperator.status}
            onClose={() => setOpenEditOperator({ status: false })}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <div className="space-y-4 relative">
                <button
                  onClick={() =>
                    setOpenEditOperator({
                      status: false,
                    })
                  }
                  className="absolute top-0 right-0 border w-10 cursor-pointer h-10 rounded-full bg-white shadow-md"
                >
                  <CloseRounded />
                </button>{' '}
                <p className="flex justify-center items-center pt-20 pb-5 text-2xl">
                  {' '}
                  Permissions ({openEditOperator.currentOperatorName})
                </p>
                <div className="space-y-8">
                  <div className="relative w-full ">
                    <span className="absolute text-xs text-[#2D80E0] bg-white -top-2 left-4">
                      Preset permissions duty
                    </span>
                    <select
                      onChange={(e) =>
                        setOpenEditOperator({
                          ...openEditOperator,
                          currentOperatorRole: e.target.value,
                        })
                      }
                      className="w-full p-2 outline-none rounded-md"
                    >
                      {roles?.map((role) => (
                        <>
                          {openEditOperator?.currentOperatorRole &&
                          role ==
                            openEditOperator?.currentOperatorRole?.toLowerCase() ? (
                            <option value={role} selected>
                              {role}
                            </option>
                          ) : (
                            <option value={role}>{role}</option>
                          )}
                        </>
                      ))}
                    </select>
                  </div>
                  <div className="flex space-x-2 items-center ">
                    <span>Status</span>
                    <AntSwitch
                      defaultChecked
                      inputProps={{ 'aria-label': 'ant design' }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 justify-center items-center pb-8">
                <button
                  onClick={() =>
                    setOpenEditOperator({
                      status: false,
                    })
                  }
                  className="flex justify-center items-center px-6 lg:text-sm  border border-[#2D80E0] rounded-md outline-none p-2"
                >
                  Cancel
                </button>
                <button
                  onClick={updateOperator}
                  className="flex justify-center items-center text-white px-6 p-2 lg:text-sm  bg-[#2D80E0] rounded-md outline-none"
                >
                  Update
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default OperatorSettings
