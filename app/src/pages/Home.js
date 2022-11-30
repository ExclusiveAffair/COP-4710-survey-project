import React from "react";
import Navbar from "../components/navbar";
import '../StyleSheet/App.css'
import Published from './PubSurveys'

export default function Home (){
    return (
        <div className="home">
            <Navbar/>
            <br/>
            <Published/>
        </div>
    )
}