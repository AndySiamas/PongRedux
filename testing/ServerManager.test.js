import {mount, configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ServerManager from '../client/src/Components/ServerManager.jsx';

configure({ adapter: new Adapter() });

describe('Server Manager', () => {

    const id = 9542;

    test('it is able to get project information from an ID', (done) => {
        ServerManager.getProject(id).then((project) => {
            let props = Object.keys(project);
            expect(props).toContain('id');
            expect(props).toContain('name');
            expect(props).toContain('campaign');
            expect(props).toContain('faq');
            expect(props).toContain('launchDate');
            expect(props).toContain('updates');
            expect(props).toContain('comments');
            done();
        });
    });

    test('it is able to get campaign information from an ID', (done) => {
        ServerManager.getCampaign(id).then((campaign) => {
            let props = Object.keys(campaign);
            expect(props).toContain('aboutSection');
            expect(props).toContain('otherSections');
            done();
        });
    });

    test('it is able to get FAQ from an ID', (done) => {
        ServerManager.getFaq(id).then((questions) => {
            let questionProps = Object.keys(questions[0]);
            expect(Array.isArray(questions)).toBe(true);
            expect(questionProps).toContain('inquiry');
            expect(questionProps).toContain('answer');
            expect(questionProps).toContain('lastUpdated');
            done();
        });
    });

    test('it is able to get updates from an ID', (done) => {
        ServerManager.getUpdates(id).then((updates) => {
            let updateProps = Object.keys(updates[0]);
            expect(Array.isArray(updates)).toBe(true);
            expect(updateProps).toContain('event');
            expect(updateProps).toContain('title');
            expect(updateProps).toContain('date');
            expect(updateProps).toContain('paragraph');
            done();
        });
    });

    test('it is able to get comments from an ID', (done) => {
        ServerManager.getComments(id).then((comments) => {
            let commentProps = Object.keys(comments[0]);
            expect(Array.isArray(comments)).toBe(true);
            expect(commentProps).toContain('username');
            expect(commentProps).toContain('text');
            expect(commentProps).toContain('icon');
            expect(commentProps).toContain('date');
            expect(commentProps).toContain('childComments');
            done();
        });
    });

    test('it is able to get all projects in database', (done) => {
        ServerManager.getAllProjects().then((projects) => {
            expect(Array.isArray(projects.data)).toBe(true);
            expect(projects.data.length).toEqual(100);
            done();
        });
    });
});