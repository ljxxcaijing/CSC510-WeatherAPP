import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {act} from 'react-dom/test-utils';
import App from './App'


let container;

describe("user", () => {
        
    afterEach(() => {
        container = null;
    });

    describe("input incorrect city name then click button", () => {

        it ("should display error message within 2.5 seconds", function(done) {
            container = document.createElement('div');
            act(() => {
                ReactDOM.render(<App />, container);
            });
            const input = container.querySelector('input');
            input.value = 'abcdefghijklmnopqrstuvwxyz';
            ReactTestUtils.Simulate.change(input);
            const button = container.querySelector('button');
            ReactTestUtils.Simulate.click(button);
            setTimeout(function() {
                const error_message = container.querySelector('.error-message');
                expect(error_message.textContent).toBe('City not found!');
                done();
            }, 2500);
        });
    });


    describe("input correct city name then click button", () => {

        it ("should display current weather and weather forecast within 2.5 seconds", function(done) {
            container = document.createElement('div');
            act(() => {
                ReactDOM.render(<App />, container);
            });
            const input = container.querySelector('input');
            input.value = 'Durham';
            ReactTestUtils.Simulate.change(input);
            const button = container.querySelector('button');
            ReactTestUtils.Simulate.click(button);
            setTimeout(function() {
                const location = container.querySelector('.location');
                expect(location.textContent).toBe('Durham,US');
                const temp = container.querySelector('.temp');
                expect(/^(\-)?[0-9]+(\.)?[0-9]*$/.test(temp.textContent.slice(0, -2))).toBeTruthy;
                const humidity_windspeed = container.querySelector('.humidity');
                const humidity = humidity_windspeed.textContent.split(' ')[1];
                const windspeed = humidity_windspeed.textContent.split(' ')[3];
                expect(/^[0-9]*$/.test(humidity.slice(0, -1))).toBeTruthy;
                expect(/^[0-9]+(\.)?[0-9]*$/.test(windspeed.slice(0, -3))).toBeTruthy;

                const table = container.querySelector('.forecast-table');
                const trs = table.querySelectorAll('tr');
                const lastDate = new Date(trs[trs.length - 1].querySelector('td').innerHTML);
                const currentDate = new Date();
                expect((lastDate.getTime() - currentDate.getTime()) / 3.6e6).toBeGreaterThan(24);
                trs.forEach((tr, rowIndex) => {
                    const tds = tr.querySelectorAll('td');
                    expect(tds).toHaveLength(5);
                });
                done();
            }, 2500);
        });
    });


    describe("tap on tab", () => {

        beforeAll(function(done) {
            container = document.createElement('div');
            act(() => {
                ReactDOM.render(<App />, container);
            });
            const input = container.querySelector('input');
            input.value = 'Durham';
            ReactTestUtils.Simulate.change(input);
            const button = container.querySelector('button');
            ReactTestUtils.Simulate.click(button);

            setTimeout(function() {
                done();
            }, 2500);
        });

        it("should display recommandation on drinks within 2 seconds", function(done) {
            const recommendation = container.querySelector('.recommendation');
            const tabs = recommendation.querySelectorAll('li');
            ReactTestUtils.Simulate.click(tabs[0]);
            setTimeout(function() {
                const panel = recommendation.querySelector('h3');
                const keywords = ["Bumble tea", "Fruit tea", "Milk Tea", "cold drinks", "hot chocolate"];
                expect(new RegExp(keywords.join("|")).test(panel.textContent)).toBeTruthy;
                done();
            }, 2000);
        });

        it("should display recommandation on activities within 2 seconds", function(done) {
            const recommendation = container.querySelector('.recommendation');
            const tabs = recommendation.querySelectorAll('li');
            ReactTestUtils.Simulate.click(tabs[1]);
            setTimeout(function() {
                const panel = recommendation.querySelector('h3');
                const keywords = ["sports", "outdoor", "indoor"];
                expect(new RegExp(keywords.join("|")).test(panel.textContent)).toBeTruthy;
                done();
            }, 2000);
        });

        it("should display recommandation on clothes within 2 seconds", function(done) {
            const recommendation = container.querySelector('.recommendation');
            const tabs = recommendation.querySelectorAll('li');
            ReactTestUtils.Simulate.click(tabs[2]);
            setTimeout(function() {
                const panel = recommendation.querySelector('h3');
                const keywords = ["T-shirt", "Long-sleeved shirts", "windbreaker", "coat", "sweater", "sweatshirts", "jacket", "shorts", "jeans", "pants", "joggers", "gloves", "umbrella", "dress"];
                expect(new RegExp(keywords.join("|")).test(panel.textContent)).toBeTruthy;
                done();
            }, 2000);
        });

        it("should display plants care tips within 2 seconds", function(done) {
            const recommendation = container.querySelector('.recommendation');
            const tabs = recommendation.querySelectorAll('li');
            ReactTestUtils.Simulate.click(tabs[3]);
            setTimeout(function() {
                const panel = recommendation.querySelector('h3');
                expect(/^plant*$/.test(panel.textContent)).toBeTruthy;
                done();
            }, 2000);
        });
    });


    describe("get an alert of", () => {

        it("snow", function(done) {
            container = document.createElement('div');
            act(() => {
                ReactDOM.render(<App />, container);
            });
            const input = container.querySelector('input');
            input.value = 'Finnmark';
            ReactTestUtils.Simulate.change(input);
            const button = container.querySelector('button');
            ReactTestUtils.Simulate.click(button);
            setTimeout(function() {
                const alert = container.querySelector("p");
                expect(alert.textContent).toBe("The Following Weather is Snow, please be careful!");
                done();
            }, 1000);
        });
    });

});