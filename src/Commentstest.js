import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
// import {shallow, configure, mount} from 'enzyme';
// import ReactTestUtils, {act} from 'react-dom/test-utils';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'
// import App from './App';
import Comments from './Comments';

afterEach(cleanup);

describe('in Comments >',  ()=> {
    it('should have textarea', async ()=>{
        render(<Comments data = {[]}/>);
        const textarea = await screen.queryByText('no one added comments');
        expect(textarea).toBeInTheDocument();
        
    })
}
)


