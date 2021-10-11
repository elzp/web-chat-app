import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
// import {shallow, configure, mount} from 'enzyme';
// import ReactTestUtils, {act} from 'react-dom/test-utils';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
// import App from './App';
import AddComment from './AddComment';

afterEach(cleanup);

describe('in AddComment >',  ()=> {
    const changeFnc = jest.fn();
        const buttonClickFnc = jest.fn();
        const placeholders = {comment: 'Add your comment',
             user: 'username for non registered user:'};
        const addCommentComponent = <AddComment changeFn={changeFnc} buttonClickFnc={buttonClickFnc} 
        placeholders={placeholders} newcomment={""} username={""} />

    it('should have textarea for text of comment', async()=>{
        
        render(addCommentComponent);
        const commentText = await screen.queryByPlaceholderText('Add your comment');
        expect(commentText).toBeInTheDocument();
        
    })
    it('should have textarea for random username', async()=>{
        render(addCommentComponent);
        const placeforUsername = await screen.queryByPlaceholderText('username for non registered user:');
        expect(placeforUsername).toBeInTheDocument();
  
        
    })
    it('should have button', async()=>{
        render(<AddComment/>);
        const button = await screen.queryByTestId('add-comment-button');
        expect(button.textContent).toBe('Add');
        
    })
}
)