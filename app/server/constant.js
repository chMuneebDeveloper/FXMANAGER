const getAPIBaseUrl = () => {
    let url = '';
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log('Development Mode');
      url = 'https://livemanagerapi.finexcloud.com';
    } else {
      console.log('Production Mode');
      url = 'https://livemanagerapi.finexcloud.com';
    }
    return url;
  };
  
  export const API_BASE_URL = getAPIBaseUrl();
  
  export const SIGNUP = API_BASE_URL + '/users/signupuser';
  
  export const SIGNIN = API_BASE_URL + '/Authentication/Authenticate';
  
  export const CHECKDOMAINURL = API_BASE_URL + '/Authentication/CheckDomain?url=';
  
  export const GET_SALES_ORDERS = API_BASE_URL + '/Sales/SelectAll?';
  
  export const GET_PAGEING_MAIN_ACCOUNT = API_BASE_URL + '/Finance/SelectNextPage?';
  
  export const GET_PURCHASE_ORDERS = API_BASE_URL + '/Purchase/SelectAll?';
  
  export const GET_SALES_ORDER_DETAIL =
    API_BASE_URL + '/Sales/GetRec?invoiceNumber=';
  
  export const GET_PURCHASE_ORDER_DETAIL =
    API_BASE_URL + '/Purchase/GetRec?invoiceNumber=';
  
  export const GET_ADMIN_DASHBOARDDATA =
    API_BASE_URL + '/Graph/SelectGraphsOnLoad?graphIds=401,402,403,404,405,400,406';
  
  export const GET_ADMIN_FINANCEDATA =
    API_BASE_URL + '/Graph/SelectGraphsOnLoad?graphIds=201,202,203,204';
  
  export const GET_ADMIN_ECOMDATA =
    API_BASE_URL + '/Graph/EcommDashboard?cultureCode=';
  
  export const GET_ADMIN_HRDATA =
    API_BASE_URL + '/Graph/HRDashboard?cultureCode=';
  
  export const GET_ADMIN_POSDATA =
    API_BASE_URL + '/Graph/SelectPOSGraphsOnLoad?cultureCode=';
  
  export const GET_SPECIFIC_GRAPH =
    API_BASE_URL + '/Graph/SelectGraphsByID?graphID=';
  
  export const GET_SPECIFIC_GRAPH_ECOM =
    API_BASE_URL + '/Graph/GetOrderAndRefund?cultureCode=en-US&month=';
  
  export const GET_SPECIFIC_GRAPH_HR =
    API_BASE_URL + '/Graph/EmployeeAttendance?cultureCode=en-US&month=';
  
  export const GET_EMPLOY_LIST = API_BASE_URL + '/Graph/SelectAllEmployee?';
  
  export const GET_EMPLOY_DETAIL =
    API_BASE_URL + '/HR/SelectEmployee?cultureCode=';
  
  export const GET_EMPLOYCONTRACT_DETAIL =
    API_BASE_URL + '/HR/SelectEmployeeContract?cultureCode=';
  
  export const GET_FINANCE_STATEMENT_REPORT =
    API_BASE_URL + '/Finance/SelectAllAccounts?subAccountSupport=';
  
  export const GET_FINANCE_STATEMENT_REPORT_Detail =
    API_BASE_URL + '/Finance/SelectPartnerOfStatementOfAccount?type=';
  
  export const GET_FINANCE_SUMMARY_REPORT_Detail =
    API_BASE_URL + '/Finance/SelectPartnerAccountSummary?';
  
  export const GET_EMPLOYEE_ATTENDANCE_Detail =
    API_BASE_URL + '/HR/SelectEmployeeAttendance?cultureCode=';
  
  export const GET_RIDERS_ORDERS =
    API_BASE_URL + '/Sales/GetOrderListByRiderCode?isAdmin=false';
  
  export const GET_RIDERS_ORDER_DETAILS =
    API_BASE_URL + '/Sales/GetOrderDetailsByInvoiceID?invoiceNumber=';
  
  export const GET_RIDER_ORDER_STATUS =
    API_BASE_URL + '/Sales/UpdateRiderDeliveryStatus?invoiceNumber=';
  
    export const GET_SPECIFIC_GODOWN_GRAPH =
    API_BASE_URL + '/Graph/SelectGraphsOnLoad?graphIds=400,401,402,403,404,405,406&goDownCode=';
  
  