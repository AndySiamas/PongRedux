import {mount, configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Description from '../client/src/Components/Description';

configure({ adapter: new Adapter() });

describe('Description Component', () => {
    test('it contains a projectID prop', (done) => {
        const wrapper = mount(<Description projectID={8082}/>);
        expect(wrapper.props().projectID).toEqual(8082);
        done();
    });

    test('it contains inTransition and tabRequest properties', (done) => {
        const wrapper = mount(<Description projectID={8082}/>);
        expect(wrapper.instance().inTransition).toBe(false);
        expect(wrapper.instance().tabRequest).toBe(null);
        done();
    });

    test('it contains project and currentTab for its state', (done) => {
        const wrapper = mount(<Description projectID={8082}/>);
        const expectedState = {project: {}, currentTab: 'campaign'};
        expect(wrapper.state()).toMatchObject(expectedState);
        done();
    });

    test('it contains refs for campaign, faq, updates, and comments', (done) => {
        const wrapper = mount(<Description projectID={8082}/>);
        const refs = Object.keys(wrapper.instance().refs);
        expect(refs).toContain('campaign');
        expect(refs).toContain('faq');
        expect(refs).toContain('updates');
        expect(refs).toContain('comments');
        done();
    });

    test('it contains changeTab function which changes the current tab', (done) => {
        const wrapper = mount(<Description projectID={8082}/>);
        wrapper.instance().changeTab('faq');
        wrapper.update();
        expect(wrapper.state().currentTab).toBe('faq');
        done();
    });
});