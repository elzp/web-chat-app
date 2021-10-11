import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure, mount} from 'enzyme';
import ReactTestUtils, {act} from 'react-dom/test-utils';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import AddComment from './AddComment';
import Comments from './Comments';
 

configure({adapter: new Adapter()});
afterEach(cleanup);
// const listedElem = ""
// const handleChange = jest.fn();
// const chandleButtonClick = jest.fn();
// const AppWithprops = <App data={listedElem}
//  changeFnc= {handleChange} buttonClickFnc= {chandleButtonClick}  
//   newcomment={""} username={""} />



// describe('clicking button',()=>{

// cleanup()
// it('twice adds 2 <li>', async ()=>{
//   render(<App />);
 
//   const button = screen.getByTestId("add-comment-button");
//   await act(async ()=>{
//     await fireEvent.change(screen.queryByTestId("comment-input"), {value: {target: 'first comment'}})
//   await fireEvent.change(screen.queryByTestId("user-input"), {value: {target: 'user1'}})
//   await fireEvent.click(button);
//   await fireEvent.change(screen.queryByTestId("comment-input"), {value: {target: 'second comment'}})
//   await fireEvent.change(screen.queryByTestId("user-input"), {value: {target: 'user2'}})
//   await fireEvent.click(button);
//   })
  
//   let listedElements = await screen.queryAllByTestId("li");
//   expect(listedElements.length).toBe(2); 

// })
// })

describe('scenario:', ()=>{
  it('user not added username', async ()=>{
    cleanup();
    render(<App/>);
    const button = screen.getByTestId("add-comment-button");
    const commentInput = screen.getByTestId("comment-input");
    await fireEvent.change(commentInput , { target: { value: 'some comment' } }); 
    await fireEvent.click(button);
    const userComment = await screen.queryByTestId("addcomment-error");
  // screen.debug();

  expect(userComment).toHaveTextContent("add username");
  }

  );
  it('user not inputed comment to add', async ()=>{
    cleanup();
    render(<App/>);
    const button = screen.getByTestId("add-comment-button");
    const userInput = screen.getByTestId("user-input");
    await fireEvent.change(userInput , { target: { value: 'user' } }); 
    await fireEvent.click(button);
    //screen.debug();
    const error = await screen.queryByTestId("addcomment-error");

  expect(error).toHaveTextContent("add text to comment");
  })
  it('user added comment', async ()=>{
    cleanup();
    render(<App />);
    const button = screen.getByTestId("add-comment-button");
    let listedElements = screen.queryByTestId("li");
    expect(listedElements).toBeNull();
    await act(async ()=>{
    await fireEvent.change(screen.queryByTestId("comment-input"), {target: {value: 'first comment'}})
    await fireEvent.change(screen.queryByTestId("user-input"), {target: {value: 'firstuser1'}})
    //screen.debug();
    await fireEvent.click(button);
    //screen.debug();
    })
    let listedElements2 = await screen.queryAllByTestId("li");
    expect(listedElements2.length).toBe(1); 
  
  })
  it('user is not able to add comment with zero inputed text', async ()=>{
    cleanup();
    render(<App />);
    const button = screen.getByTestId("add-comment-button");
    let listedElements = screen.queryByTestId("li");
    expect(listedElements).toBeNull();
    await act(async ()=>{
    await fireEvent.click(button);
    })
    let listedElements2 = await screen.queryAllByTestId("li");
    expect(listedElements2.length).toBe(0); 
    const userComment = await screen.queryByTestId("addcomment-error");
    expect(userComment).toHaveTextContent("add some content");
  
  })

  it('error message dissapears after good usage of inputs', async ()=>{
    cleanup();
    render(<App />);
    const button = screen.getByTestId("add-comment-button");
    let listedElements = screen.queryByTestId("li");
    expect(listedElements).toBeNull();
    await act(async ()=>{
    await fireEvent.change(screen.queryByTestId("comment-input"), {target: {value: 'first comment'}})
    await fireEvent.click(button);
    })
    
    const userComment = await screen.queryByTestId("addcomment-error");
    expect(userComment).toHaveTextContent("add username");


    await act(async ()=>{
      await fireEvent.change(screen.queryByTestId("comment-input"), {target: {value: 'first comment'}})
      await fireEvent.change(screen.queryByTestId("user-input"), {target: {value: 'firstuser1'}})
      await fireEvent.click(button);
      })
      //screen.debug();
    const userComment2 = await screen.queryByTestId("addcomment-error");
    expect(userComment2).not.toBeInTheDocument();//.toBeEmptyDOMElement();
  })
})
// it('display textbox style input', ()=>{
//   render(<App/>);
//   const newInput = screen.getByRole("textbox")
//   expect(newInput).toBeInTheDocument();
// })

// describe('clicking button -', ()=>{
//   const setlistedElem = jest.fn();
//   const wrapper = shallow(<App onClick={setlistedElem}/>); //shallow render of app

//   it('clicking button triggers change of state of listElements',async ()=>{ //is ok
    
//     const handleClick = jest.spyOn(React, "useState");//spyes if useState function is used
//     act(()=>{handleClick.mockImplementation(listedElem=>[listedElem, setlistedElem]);})

//     wrapper.find('[data-testid="add-comment-button"]').simulate("click");//simulate a click
//     expect(setlistedElem).toBeTruthy();
//   });


//   it ('clicking button moves value form input textbox to li element & leaves input empty', async ()=>{ //it is ok
    
//       render(<App/>)

//     let newInput = screen.getByTestId("comment-input"); // finds input for comment
//     expect(newInput).toBeInTheDocument(); 
//     expect(newInput.textContent).toBe("");

//     const button = screen.getByTestId("add-comment-button");
//     expect(button).toBeInTheDocument();

//     act(() => {
//       fireEvent.change(newInput, { target: { value: 'green' } }); //generate adding text to value event 
//     });
//     expect(newInput.value).toBe("green"); //check if input's balue has changed 

//     act(() => {
//       fireEvent.click(button); //generate click event
//     });

//     const allLiElement = await screen.queryAllByTestId("li");
//     allLiElement.forEach(it =>expect(it).toBeInTheDocument()); //check if clicking button actually generates element with testid "li"
//     expect(allLiElement[allLiElement.length-1].textContent).toBe("green"); //clicking button actually added comment as li element
//     expect(newInput.value).toBe("");// input textbox is empty

//     })

// })


describe('App should render', ()=>{
  
  it('AddComment component', async ()=>{
    cleanup();
    render(<App/>);
    const addComment = await screen.queryByTestId("AddComment");
    expect(addComment).toBeInTheDocument();
  })

  it('Comments component',async ()=>{ 
    cleanup();
    render(<App/>);
    const comments = await screen.queryByTestId("Comments");
    expect(comments).toBeInTheDocument();
  })
  
})

describe('in it',()=>{
  it('renders welcome string', () => {
    render(<App/>); 
    const welcomeText = screen.getByTestId("welcome");
    expect(welcomeText.textContent).toEqual("Choose with who you'd like to chat :)");
   
  });
})