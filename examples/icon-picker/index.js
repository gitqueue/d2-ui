import React from 'react';
import {render} from 'react-dom';
import IconPicker from '../../src/icon-picker';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const options = (function () {
    const symbolUrls = [];
    let i = 1;

    for (; i <= 40; i++) {
        const filename = i > 9 ? i : `0${i}`;
        symbolUrls.push(`${filename}.${i > 25 ? 'svg' : 'png'}`);
    }

    return symbolUrls;
}());

let value = '03.png';

// Preload the images
function preload(pictureUrls) {
    let i;
    const images = [];
    for (i = 0; i < pictureUrls.length; i++) {
        images[i] = new Image();
        images[i].src = './images/orgunitgroup/' + pictureUrls[i];
    }
}

preload(options);

function onChange(newValue) {
    value = newValue;
    renderIconPicker();
}

class ExampleWithMockD2 extends React.Component {
    getChildContext() {
        return {
            d2: {
                i18n: {
                    getTranslation(key) {
                        return key;
                    },
                },
            },
        };
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
ExampleWithMockD2.childContextTypes = {
    d2: React.PropTypes.object,
};

function renderIconPicker() {
    render(
        <ExampleWithMockD2>
            <Card>
                <CardText>
                    Without initial value
                    <IconPicker
                        options={options}
                        imgPath="./images/orgunitgroup"
                        labelText="Symbol"
                    />
                </CardText>
            </Card>
            <Card>
                <CardText>
                    With initial value
                    <IconPicker
                        options={options}
                        imgPath="./images/orgunitgroup"
                        value={value}
                        onChange={onChange}
                        labelText="Symbol"
                    />
                </CardText>
            </Card>
        </ExampleWithMockD2>
        , document.querySelector('#icon-picker'));
}

renderIconPicker();
