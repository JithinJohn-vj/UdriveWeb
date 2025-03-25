// AUTH
export const B_loginEmployee = 'employee/login';
export const B_updateAcessToken = 'employee/refresh-employee';
export const B_getUserInfo = 'employee/me';
export const B_logoutEmployee = 'employee/logout';

// DASHBOARD-DATA
export const B_topFiveBookedCars = 'car/most-booked-cars';
export const B_getMonthlyRevenue = 'booking/get-monthly-revenue';
export const B_getTotalRevenue = 'booking/get-total-revenue';

// EMPLOYEE
export const B_createEmployee = 'employee/create';
export const B_getAllEmployeesInfo = 'employee/get-all-employee';
export const B_getSingleEmployeeInfo = 'employee/get-single-employee/';
export const B_editEmployee = 'employee/edit/';
export const B_deleteEmployee = 'employee/delete/';
export const B_blockEmployee = 'employee/block/';
export const B_forgotPassword = 'employee/forgot-password';
export const B_enterNewPassword = 'employee/reset-password';
export const B_updatePassword = 'employee/update-password';
export const B_employeeMultipleDelete = 'employee/multiple-delete';
export const B_employeeRevenue = 'employee/get-employee-revenue/';

// CUSTOMERS
export const B_createCustomer = 'customer/create';
export const B_editCustomer = 'customer/edit/';
export const B_getAllCustomers = 'customer/getall';
export const B_deleteCustomer = 'customer/delete/';
export const B_getSingleCustomer = 'customer/getsingle/';
export const B_customerMultipleDelete = 'customer/multiple-delete';
export const B_customerRevenue = 'customer/get-total-revenue/';

// CARS
export const B_createCar = 'car/create';
export const B_getAllCars = 'car/get-all-cars';
export const B_getSingleCar = 'car/get/';
export const B_editCar = 'car/edit/';
export const B_deleteCar = 'car/delete/';
export const B_carsMultipleDelete = 'car/multiple-delete';
export const B_carsRevenue = 'car/get-total-revenue/';
export const B_carsOnYard = 'car/get-cars-on-yard';
export const B_carsOnRunning = 'car/get-running-cars';
export const B_carsAddKilometers = 'booking/add-kilometre/';
export const B_carsPollutionNotification = 'car/get-pollution-notification';
export const B_carsServiceDue = 'car/get-service-due';
export const B_InsuranceDue = 'car/get-insurance-due';
export const B_carsServiceOverDue = 'car/get-service-overdue';
export const B_insuranceOverDue = 'car/get-insurance-overdue';
export const B_ResetCarServiceKms = 'car/reset-service-kilometre/';
export const B_pollutionOverDue = 'car/get-pollution-overdue';
export const B_addServiceDetails = 'car/add-service-details/';
export const B_deleteServiceDetails = 'car/delete-service-details/';
export const B_getAvailableCarsForCalender = 'car/get-available-cars/';
export const B_getCarActivities = 'car/get-car-activities/';

// BOOKING
export const B_createBooking = 'booking/create';
export const B_getAllBookings = 'booking/get-all-booking';
export const B_getSingleBooking = 'booking/get-single-booking/';
export const B_editBooking = 'booking/edit/';
export const B_deleteBooking = 'booking/delete/';
export const B_bookingStatus = 'booking/status/';
export const B_bookingMultipleDelete = 'booking/multiple-delete/';
export const B_upcomingBookings = 'booking/get-upcoming-bookings';
export const B_bookingUnUpdatedKilometer = 'booking/not-updated-kilometre';
export const B_bookingInvoiceNotGeneratedAll = 'booking/not-generated-invoice';
export const B_bookingInvoiceAfterAdvance = 'booking/add-invoice/';
export const B_bookingInvoiceDue = 'booking/get-invoice-due';

// CALENDAR
export const B_createEvent = 'calendar/create';
export const B_editEvent = 'calendar/edit/';
export const B_getAllEvents = 'calendar/get-all-events';
export const B_deleteEvent = 'calendar/delete/';

// Notifications
export const B_getAllNotifications = 'notification/get-notification';
export const B_markAsSeen = 'notification/seen-all';
