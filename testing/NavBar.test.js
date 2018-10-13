import {mount, configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Description from '../client/src/Components/Description.jsx';
import NavBar from '../client/src/Components/DescriptionNavBar.jsx';

configure({ adapter: new Adapter() });

describe('Navigation Component', () => {
    test('it is able to change the descriptions current tab', (done) => {
        const description = mount(<Description projectID={8082}/>);
        const changeTab = description.instance().changeTab.bind(description.instance());
        const navbar = mount(<NavBar changeTab={changeTab}/>);

        expect(description.state().currentTab).toEqual('campaign');
        navbar.props().changeTab('comments');
        description.update();
        navbar.update();
        expect(description.state().currentTab).toEqual('comments');
        done();
    });
});