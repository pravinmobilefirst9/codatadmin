/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CRow,
  CTable,
  CTableBody,
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
  CPagination,
  CPaginationItem,
  CSpinner,
} from '@coreui/react'
import { DocsLink } from 'src/components'

function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined'

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null
    return {
      width,
      height,
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow])

  return windowDimensions
}

const Invoice = () => {
  const [users, setUsers] = useState([])
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [pageNumber, setPageNumber] = useState([])
  const [page, setPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const { height, width } = useWindowDimensions()
  useEffect(() => {
    const pageNumberlength = Math.ceil(users.length / 10)
    if (pageNumber.length <= pageNumberlength) {
      for (var i = 1; i <= pageNumberlength; i++) {
        setPageNumber((pageNumber) => [...pageNumber, i])
      }
    }
  }, [users])

  useEffect(() => {
    const pagevalue = page === 0 ? 0 : page * 10
    const items = users.slice(pagevalue, pagevalue + 10)
    setData(items)
  }, [users, page])

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
    setLoader(true)
    fetch(proxyurl + url, options)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setUsers(data.results)
        setLoader(false)
      })
  }

  useEffect(() => {
    fetchData()
    setTimeout(() => {
      setLoader(false)
    }, 5000)
  }, [])

  const columns = [
    {
      key: 'ID',
      label: 'ID',
      _props: { scope: 'col' },
    },
    {
      key: 'Invoice Number',
    },
    {
      key: 'Issue Date',
    },
    {
      key: 'Total Amount',
    },
    {
      key: 'Currency',
    },
    {
      key: 'Status',
    },
    {
      key: 'Payment Reconciliation',
    },
  ]

  const handleClick = (data) => {
    setVisible(!visible)
  }

  const onClickPagination = (idx) => {
    setPage(idx)
  }

  const onClickPrevious = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const onClickNext = () => {
    console.log(pageNumber.length)
    if (page < pageNumber.length - 1) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <CCard className="mb-4 pb-5">
        <CCardHeader>Invoice</CCardHeader>
        <CForm></CForm>
        <CCardBody>
          <CTable responsive bordered borderColor="primary" className="h-50">
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
            {loader ? (
              <div className="position-absolute start-50 translate-middle-x" style={{ bottom: 20 }}>
                <CSpinner color="primary" />
              </div>
            ) : (
              <>
                <CTableBody>
                  {data.map((data, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{page * 10 + index + 1}</CTableHeaderCell>
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
              </>
            )}
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
      {!loader && (
        <CPagination
          size={width < 600 ? 'sm' : null}
          aria-label="Page navigation example"
          style={{ cursor: 'pointer' }}
          className="d-flex flex-wrap"
        >
          <CPaginationItem onClick={onClickPrevious}>Previous</CPaginationItem>
          {pageNumber.map((number, idx) => {
            return (
              <CPaginationItem
                key={idx}
                active={page === idx ? true : false}
                onClick={() => {
                  onClickPagination(idx)
                }}
              >
                {idx + 1}
              </CPaginationItem>
            )
          })}
          <CPaginationItem onClick={onClickNext}>Next</CPaginationItem>
        </CPagination>
      )}
    </>
  )
}

export default Invoice
