import {
  AccountCircleOutlined,
  CloseOutlined,
  CloseRounded,
} from '@mui/icons-material'
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { useCallback, useMemo, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { Cookies } from 'react-cookie'
import modalStyles from '../../common/ModalStyles'

const DepartmentSettings = () => {
  const [open, setOpen] = useState(false)
  const [openEditDepartment, setOpenEditDepartment] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      status: false,
      currentDeptName: '',
      currentDeptId: '',
      currentDeptMembers: [],
    }
  )

  const [selectedOperator, setSelectedOperator] = useState({
    id: '',
    name: '',
  })
  const [deptInfo, setDeptInfo] = useState({
    name: '',
    operators: [],
  })

  const cookie = new Cookies()

  const companyId = cookie.get('company')?.id

  const addOperator = (e) => {
    if (e?.id !== '' && !deptInfo.operators?.includes(e?.id)) {
      setDeptInfo({
        ...deptInfo,
        operators: [...deptInfo.operators, e],
      })
    }
  }

  const deleteOperator = useCallback(
    (name) => {
      const newOperators = deptInfo.operators?.filter(
        (operator) => operator?.name !== name
      )
      setDeptInfo({
        ...deptInfo,
        operators: newOperators,
      })
    },
    [deptInfo]
  )

  const createDepartment = async () => {
    const res = await axios.post(`companies/${companyId}/departments/create/`, {
      name: deptInfo.name,
      members: deptInfo.operators?.map((operator) => operator?.id),
    })

    console.log('***', res.data)
    setOpen(false)
  }

  const deleteDepartment = async (deptId) => {
    const res = await axios.delete(
      `companies/${companyId}/departments/${deptId}/delete`
    )

    console.log('deleted', res.data)
  }

  const updateDepartment = async () => {
    const res = await axios.put(
      `companies/${companyId}/departments/${openEditDepartment.currentDeptId}/update`,
      {
        name: openEditDepartment.currentDeptName,
        members: openEditDepartment.currentDeptMembers,
      }
    )

    console.log('updated', res.data)
    setOpenEditDepartment({ status: false })
  }

  const operators = useSelector((state) => state.dashboard.operators)

  const { data: departments } = useSWR(`companies/${companyId}/departments`)

  const memoizedDepartmentName = useMemo(
    () => (
      <div className="relative w-full">
        <span className="absolute text-xs text-[#2D80E0] bg-white -top-2 left-4">
          Department Name
        </span>
        <input
          type="text"
          value={openEditDepartment.currentDeptName}
          onChange={(e) =>
            setOpenEditDepartment({
              ...openEditDepartment,
              currentDeptName: e.target.value,
            })
          }
          className="border p-2 pl-3 outline-none w-full"
        />
      </div>
    ),
    [openEditDepartment]
  )

  const memoizedOperatorsDropdown = useMemo(
    () => (
      <div className="flex flex-col">
        {/* TODO: render selected department operators */}
        <select className="w-full p-2 outline-none rounded-md border shadow-lg mb-4">
          <option value="" disabled selected hidden>
            Add Operators
          </option>
          {operators?.team?.map((operator) => (
            <option value={operator?.id} key={operator?.id}>
              {operator?.user?.name}
            </option>
          ))}
        </select>
      </div>
    ),
    [operators?.team]
  )

  const memoizedDepartmentMembers = useMemo(
    () =>
      openEditDepartment?.currentDeptMembers?.map((member) => (
        <div className="flex justify-between items-center p-0" key={member.id}>
          <div className="flex space-x-2 items-center">
            <AccountCircleOutlined className="opacity-50 w-2 h-2" />
            <span className="text-xs">{member.name}</span>
          </div>
          <button
            onClick={() => {
              setOpenEditDepartment({
                ...openEditDepartment,
                currentDeptMembers:
                  openEditDepartment?.currentDeptMembers.filter(
                    (deptMember) => deptMember?.id !== member?.id
                  ),
              })
            }}
          >
            <CloseOutlined className="text-xs opacity-50" />
          </button>
        </div>
      )),
    [openEditDepartment]
  )

  return (
    <>
      <div className="px-6 -pt-10 space-y-10">
        <div className="flex items-center justify-between border-b border-gray-300 py-3">
          <div className="text-[#030229] opacity-70 font-semibold lg:text-lg">
            Departments
          </div>
          <button
            className="flex justify-center items-center text-white py-2 px-5 lg:text-sm font-semibold bg-[#2D80E0] rounded-md outline-none"
            onClick={() => setOpen(!open)}
          >
            Add new Department
          </button>
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <div className="space-y-12 relative">
                <button
                  onClick={() => {
                    setSelectedOperator('')
                    setOpen(false)
                    setDeptInfo({
                      name: '',
                      operators: [],
                    })
                  }}
                  className="absolute top-0 right-0 border w-10 cursor-pointer h-10 rounded-full bg-white shadow-md"
                >
                  <CloseRounded />
                </button>{' '}
                <p className="flex justify-center items-center pt-5 text-2xl">
                  {' '}
                  Add a new Department
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Department name"
                    value={deptInfo.name}
                    className="w-full border p-2 rounded-md outline-none pl-3"
                    onChange={(e) =>
                      setDeptInfo({
                        ...deptInfo,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="relative">
                  <p className="text-xs absolute -top-2 left-5 text-[#2D80E0] bg-white z-10">
                    Add operators
                  </p>
                  <select
                    value={selectedOperator.name}
                    onChange={(e) => {
                      setSelectedOperator(JSON.parse(e.target.value))
                      addOperator(JSON.parse(e.target.value))
                    }}
                    className="w-full p-3 pr-3 bg-transparent border shadow-md rounded-md relative"
                  >
                    <option value="" selected disabled>
                      Select Operator
                    </option>
                    {operators?.team &&
                      operators?.team?.map((operator) => (
                        <option
                          value={JSON.stringify({
                            id: operator?.user?.id,
                            name: operator?.user?.name,
                          })}
                          key={operator?.user?.id}
                        >
                          {operator?.user?.name}
                        </option>
                      ))}
                  </select>
                  <div className="pt-2 flex justify-between px-1">
                    {deptInfo.operators?.map((operator) => (
                      <>
                        <div>
                          <span>{operator?.name}</span>
                        </div>
                        <button onClick={() => deleteOperator(operator?.name)}>
                          <CloseRounded />
                        </button>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 justify-center items-center pb-8">
                <button
                  onClick={() => setOpen(false)}
                  className="flex justify-center items-center px-6 lg:text-sm  border border-[#2D80E0] rounded-md outline-none p-2"
                >
                  Cancel
                </button>
                <button
                  onClick={createDepartment}
                  className="flex justify-center items-center text-white px-6 p-2 lg:text-sm  bg-[#2D80E0] rounded-md outline-none"
                >
                  Add
                </button>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="border relative w-full border-[#705D5D] rounded-md p-3 lg:text-xl font-normal px-0 pb-0">
          <div className="flex justify-between items-center w-full opacity-70 text-[#705D5D] pb-4">
            <p className="pl-10">Name</p>
            <p className="pr-[23.5rem]">Operator Assigned</p>
          </div>

          {/**Operators */}
          {departments?.map((department) => (
            <>
              <hr className="absolute left-0 right-0 h-[0.5px]" />
              <div className="flex justify-around pl-10 items-center w-full hover:bg-[#DDEBFA] group">
                <button
                  className="w-full flex pt-2 items-center"
                  onClick={() => {
                    setOpenEditDepartment({
                      status: !openEditDepartment.status,
                      currentDeptName: department?.name,
                      currentDeptMembers: department?.members,
                      currentDeptId: department?.id,
                    })
                  }}
                >
                  <div className="flex items-center gap-3 py-3 w-[350px]">
                    <div className="flex flex-col justify-center items-start">
                      <p className="lg:text-lg">{department?.name}</p>
                    </div>
                  </div>
                  <p className="text-lg slg:text-lg text-left">
                    {department?.members?.length}
                  </p>
                </button>
                <div className="flex gap-4 pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      deleteDepartment(department?.id)
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
            open={openEditDepartment.status}
            onClose={() =>
              setOpenEditDepartment({
                ...openEditDepartment,
                status: !openEditDepartment.status,
              })
            }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyles}>
              <div className="space-y-8">
                <p className="flex justify-center items-center pt-5 text-2xl">
                  Edit {openEditDepartment.currentDeptName} Department
                </p>
                {memoizedDepartmentName}
                <div>
                  {memoizedOperatorsDropdown}
                  {memoizedDepartmentMembers}
                </div>
                <div className="flex space-x-6 justify-center items-center pb-8">
                  <button className="flex justify-center items-center px-6 lg:text-sm  border border-[#2D80E0] rounded-md outline-none p-2">
                    Cancel
                  </button>
                  <button
                    onClick={updateDepartment}
                    className="flex justify-center items-center text-white px-6 p-2 lg:text-sm  bg-[#2D80E0] rounded-md outline-none"
                  >
                    Update
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default DepartmentSettings
