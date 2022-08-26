const API_URL = process.env.REACT_APP_API || 'https://dev-api.stud.com';

const TradeOptions = [
    { value: '3 Figures', label: '3 Figures' },
    { value: '4 Figures', label: '4 Figures' },
    { value: '5 Figures', label: '5 Figures' }
]

const RoleOptions = [
    { value: 'common', label: 'Search Marketplace' },
    { value: 'freelancer', label: 'Work as a Freelancer' },
    { value: 'buyer', label: 'Buy Domains' },
    { value: 'seller', label: 'Sell Domains' }
]

const BusinessStatus = [
    { value: 'Buy Now', label: 'Buy Now' },
    { value: 'Price Upon Request', label: 'Price Upon Request' },
    { value: 'Enquire', label: 'Enquire' },
    { value: 'Get Price', label: 'Get Price' }
]

const pageOptions = {
    pageSize: 8, pageSizes: true
};

const toolbarOptions = ['Search'];

const searchOptions = {
    ignoreCase: true,
    key: '',
    operator: 'contains'
};

module.exports = {
    API_URL,
    TradeOptions,
    RoleOptions,
    BusinessStatus,
    pageOptions,
    toolbarOptions,
    searchOptions
}
