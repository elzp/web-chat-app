import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup);


test('renders welcome string', () => {
  render(<App />); 
  const welcomeText = screen.getByTestId("welcome");
  expect(welcomeText.textContent).toEqual("hello world");
 
 // const linkElement = screen.getByText(/hello world/i);
  //expect(linkElement).toBeInTheDocument();
 
});

test(`don't have listed elements at first`, () => {
  render(<App />); 
  const listedElements = screen.queryByTestId("li");
  //listedElements.forEach(it =>expect(it).not().toBeInTheDocument());
  //let listedElements = screen.queryByTestId("li");
  expect(listedElements).toBe(null);

});


it('have "Add" button', ()=>{
  render(<App />);
  const button = screen.getByTestId("add-comment-button")
  expect(button.textContent).toBe("Add");
})


// it('button add an li', async (done)=>{
//   render(<App />);
//   const button = screen.getByTestId("add-comment-button");
//   let listedElements = screen.queryByTestId("li");
//   expect(listedElements).toBe(null);
//   await fireEvent.click(button);
//   listedElements =  screen.queryByTestId("li");
//   expect(listedElements.length).toBe(1); 
//   await fireEvent.click(button);
//   listedElements = screen.queryByTestId("li");;
//   expect(listedElements.length).toBe(2);

// })

it('clicking button adds one <li>', async ()=>{
  render(<App />);
 
  const button = screen.getByTestId("add-comment-button");
  let listedElements = screen.queryByTestId("li");
  expect(listedElements).toBeNull();
  await fireEvent.click(button);
  let listedElements2 = await screen.queryAllByTestId("li");
  expect(listedElements2.length).toBe(1); 
  

  // await fireEvent.click(button);
  // listedElements = screen.queryByTestId("li");;
  // expect(listedElements.length).toBe(2);

})

it('clicking button 2 times-adds 2 <li>', async ()=>{
  render(<App />);
 
  const button = screen.getByTestId("add-comment-button");
  await fireEvent.click(button);
  await fireEvent.click(button);
  let listedElements = await screen.queryAllByTestId("li");
  expect(listedElements.length).toBe(2); 
  

  // await fireEvent.click(button);
  // listedElements = screen.queryByTestId("li");;
  // expect(listedElements.length).toBe(2);

})
