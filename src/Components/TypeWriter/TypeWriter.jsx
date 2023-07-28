import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const TypeWriter = () => {

    const [text] = useTypewriter({
        words: ['Core Java', 'JavaScript', 'React', 'Node', 'Express', 'MongoDB'],
        loop: {},
        typeSpeed: 120
    });



    return (
        <>
            <div className="fixed left-20 top-32">
                <h1 className='text-white text-2xl'>Welcome to <span className='text-yellow-400 font-bold'>TECH TALK </span></h1>
            </div>

            <h1 className='text-3xl text-white font-semibold fixed top-3/4 left-1/3'>I'll be writing blog on
                <span className='text-4xl text-yellow-400 ml-5 font-bold'>{text} <Cursor /></span>
            </h1>

        </>
    )
}

export default TypeWriter