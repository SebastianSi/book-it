import React from 'react';
import { Carousel } from 'antd';

const HomePage = () => {
    return (
        <>
            <br/>
            <br/>
            <br/>
            <div style={{fontSize: '1.3rem', width: '60%', marginLeft: '20%'}}>
                At Find-PT, our goal is to help regular people find a trainer or nutrition coach
                in selected cities, and to help personal trainers reach out to more clients.
            </div>
            <br/>
            <br/>
            <br/>
            <Carousel autoplay>
                <div>
                    "Awesome service, I found a trainer right in my home town" - Liz, gym enthusiast
                </div>
                <div>
                    "As a trainer, I found it harder to find clients in person, but with Find-PT,
                    I was able to double my clients in a couple of months" - John, certified PT
                </div>
                <div>
                    "It's a pretty basic app, but I was able to find a nutritionist with it.
                    Hope they add more features soon" - Alex
                </div>
            </Carousel>
        </>
        )
};

export default HomePage;