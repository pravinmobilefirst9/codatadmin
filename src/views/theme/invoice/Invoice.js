/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormLabel,
  CFormInput,
  CModal,
  CModalBody,
  CModalTitle,
  CModalHeader,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'

const Invoice = () => {
  const [users, setUsers] = useState([])
  const [visible, setVisible] = useState(false)
  const [modalData, setModalData] = useState()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Basic VXBvUWVZbEVPYnZnU3B6MmFHcE1kYUY3M2k2MnRhYmFsbXNIem9hWA==',
    },
  }

  const proxyurl = 'https://cors-anywhere.herokuapp.com/'
  const url =
    'https://api.codat.io/companies/082a94eb-7498-4fbd-9153-8178e698a3d6/data/invoices?page=1&pageSize=100'

  const fetchData = () => {
    fetch(proxyurl + url, options)
      .then((response) => {
        //console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data.results)
        setUsers(data.results)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      key: 'ID',
      label: 'ID',
      _props: { scope: 'col' },
    },
    {
      key: 'Invoice Number',
      _props: { scope: 'col' },
    },
    {
      key: 'Issue Date',
      _props: { scope: 'col' },
    },
    {
      key: 'Total Amount',
      _props: { scope: 'col' },
    },
    {
      key: 'Currency',
      _props: { scope: 'col' },
    },
    {
      key: 'Status',
      _props: { scope: 'col' },
    },
    {
      key: 'Payment Reconciliation',
    },
  ]

  const handleClick = (data) => {
    setVisible(!visible)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Invoice
          <DocsLink href="https://coreui.io/docs/utilities/colors/" />
        </CCardHeader>
        <CForm></CForm>
        <CCardBody>
          <CRow>
            {/* <CTable responsive bordered borderColor="primary" columns={columns} items={users} /> */}
          </CRow>
          <CTable responsive bordered borderColor="primary">
            <CTableHead>
              <CTableRow>
                {columns.map((heading, idx) => {
                  return (
                    <CTableHeaderCell key={idx} scope="col">
                      {heading?.key}
                    </CTableHeaderCell>
                  )
                })}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((data, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{data?.invoiceNumber}</CTableDataCell>
                    <CTableDataCell>{data?.issueDate}</CTableDataCell>
                    <CTableDataCell>{data?.totalAmount}</CTableDataCell>
                    <CTableDataCell>{data?.currency}</CTableDataCell>
                    <CTableDataCell>{data?.status}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        onClick={() => handleClick(data)}
                        color="primary"
                        variant="outline"
                        style={{ marginLeft: '10px' }}
                      >
                        Click Here
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle>
              <CCardHeader className="m-3">Payment Reconciliation</CCardHeader>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="m-1">
              <div className="m-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Company ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Enter Company ID"
                />
              </div>
              <div className="m-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Connection ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Enter Connection ID"
                />
              </div>
              <div className="m-3">
                <CButton color="primary" variant="outline">
                  Reconcile
                </CButton>
              </div>
            </div>
          </CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

export default Invoice
