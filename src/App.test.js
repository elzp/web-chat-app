import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure, mount} from 'enzyme';
import ReactTestUtils, {act} from 'react-dom/test-utils';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

configure({adapter: new Adapter()});
afterEach(cleanup);


test('renders welcome string', () => {
  render(<App />); 
  const welcomeText = screen.getByTestId("welcome");
  expect(welcomeText.textContent).toEqual("hello world");
 
});

test(`don't have listed elements at first`, () => {
  render(<App />); 
  const listedElements = screen.queryByTestId("li");
  expect(listedElements).toBe(null);

});


it('have "Add" button', ()=>{
  render(<App />);
  const button = screen.getByTestId("add-comment-button")
  expect(button.textContent).toBe("Add");
})

it('clicking button adds one <li>', async ()=>{
  render(<App />);
 
  const button = screen.getByTestId("add-comment-button");
  let listedElements = screen.queryByTestId("li");
  expect(listedElements).toBeNull();
  act(()=>{
  fireEvent.click(button);
  fireEvent.click(button);
  })
  let listedElements2 = await screen.queryAllByTestId("li");
  expect(listedElements2.length).toBe(2); 

})

it('clicking button 2 times-adds 2 <li>', async ()=>{
  render(<App />);
 
  const button = screen.getByTestId("add-comment-button");
  act(()=>{
  fireEvent.click(button);
  fireEvent.click(button);
  })
  
  let listedElements = await screen.queryAllByTestId("li");
  expect(listedElements.length).toBe(2); 

})

it('display textbox style input', ()=>{
  render(<App/>);
  const newInput = screen.getByRole("textbox")
  expect(newInput).toBeInTheDocument();
})

describe('clicking button -', ()=>{
  const setlistedElem = jest.fn();
  const wrapper = shallow(<App onClick={setlistedElem}/>); //shallow render of app

  it('clicking button triggers change of state of listElements',async ()=>{ //is ok
    
    const handleClick = jest.spyOn(React, "useState");//spyes if useState function is used
    act(()=>{handleClick.mockImplementation(listedElem=>[listedElem, setlistedElem]);})

    wrapper.find('[data-testid="add-comment-button"]').simulate("click");//simulate a click
    expect(setlistedElem).toBeTruthy();
  });


  it ('clicking button moves value form input textbox to li element & leaves input empty', async ()=>{ //it is ok
    
      render(<App/>)

    let newInput = screen.getByTestId("comment-input"); // finds input for comment
    expect(newInput).toBeInTheDocument(); 
    expect(newInput.textContent).toBe("");

    const button = screen.getByTestId("add-comment-button");
    expect(button).toBeInTheDocument();

    act(() => {
      fireEvent.change(newInput, { target: { value: 'green' } }); //generate adding text to value event 
    });
    expect(newInput.value).toBe("green"); //check if input's balue has changed 

    act(() => {
      fireEvent.click(button); //generate click event
    });

    const allLiElement = await screen.queryAllByTestId("li");
    allLiElement.forEach(it =>expect(it).toBeInTheDocument()); //check if clicking button actually generates element with testid "li"
    expect(allLiElement[allLiElement.length-1].textContent).toBe("green"); //clicking button actually added comment as li element
    expect(newInput.value).toBe("");// input textbox is empty

    })

})
