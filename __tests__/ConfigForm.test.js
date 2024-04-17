// import React from 'react';
// import { render, screen} from '@testing-library/react';
// import ConfigForm from '../src/components/ConfigForm'
// import { HashRouter } from 'react-router-dom';
// import '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event';
// import supertest from 'supertest';
// // import app from '../server/server'



// // This first block of tests is using jest and react library to check that the react component is rendering as it should  
// // It also tests that the drop downs and checkbox components work when clicked / selected
// describe ('test that ConfigForm is rendering', ()=>{
//     let form; 
//     const availableOptions = ['Select', '10 Seconds', '1 Minute', '5 Minutes', '15 Minutes', '30 Minutes', '1 Hour', '2 Hours', '3 Hours', 'Once Daily', 'Every 2 Days','Every 3 Days', 'Once Weekly']
    
//     beforeEach(()=>{
//         form = render(<HashRouter><ConfigForm/></HashRouter>); 
//     }); 

//     test('form includes App name, Function name, Function URL input feilds ', ()=>{
//         expect(screen.getByRole('textbox', {name: 'App name:'})).toBeInTheDocument();
//         expect(screen.getByRole('textbox', {name: 'Function name:'})).toBeInTheDocument();
//         expect(screen.getByRole('textbox', {name: 'Function URL:'})).toBeInTheDocument();  
//     }); 

//     test('form includes Save and Cancel buttons ', ()=>{
//         expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument();
//         expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument(); 
//     }); 

//     test('form includes drop down for Invocation rate ', ()=>{
//         expect(screen.getByRole('combobox', {name: 'Invocation rate:'})).toBeInTheDocument(); 
//     }); 

//     test('form includes checkbox named "Warmer" ', ()=>{
//         expect(screen.getByRole('checkbox', {name: 'Warmer:'})).toBeInTheDocument(); 
//     }); 

//     test('drop down for Invocation rate allows you to select one of the available options ', async ()=>{
//         const user = userEvent.setup()
//         for (let i = 0;  i< availableOptions.length; i++){
//             await user.selectOptions(screen.getByRole('combobox'), availableOptions[i])
//             expect(screen.getByRole('option', {name: availableOptions[i]}).selected).toBe(true);
//         }
//     }); 

//     test('checkbox allows you to check or uncheck', async ()=>{
//         const user = userEvent.setup()
//         await user.click(screen.getByRole('checkbox'))
//         expect(screen.getByRole('checkbox', {checked:true})).toBeTruthy(); 
//     }); 

// }); 


// // This second block of tests is using jest and react library to check that the buttons work as required 
// describe ('test that config form has data validation', ()=>{
//     let form; 
    
//     beforeEach(()=>{
//         form = render(<HashRouter><ConfigForm/></HashRouter>); 
//     }); 

//     test('if Save button is clicked and feilds are empty, show error message', async ()=>{
//         const user = userEvent.setup()
//         await user.click(screen.getByRole('button', {name: 'Save'})); 
//         expect(screen.getByText('Please fill in all required feilds')).toBeInTheDocument(); 
//     }); 

//     xtest('if all feilds are filled, Save button can be clicked successfully', ()=>{
//         // TO BE COMPLETED 
//     }); 
// })


// // This third block of tests is using 'supertest' library in addition to jest and react library to run integration tests that make sure the fetch requests are working properly 

// // const server = 'http://localhost:3000'
// xdescribe ('form sends post request successfully', ()=>{
//     afterAll(()=>{
//         app.close()
//     })

//     process.env.TEST_NO_INTITALIZE='jest_test';
//     xdescribe('/api/config/new', ()=>{
//         xdescribe('POST', ()=>{
//             xit('responds with 200 status and text content type', ()=>{
//                 return supertest(app)
//                 .post('/api/config/new')
//                 .expect('Content-Type', /application\/json/)
//                 .expect(200)
//             }); 
//         }); 
//     }); 

   
// })
