import { useEffect, useState } from "react";

export default function getCity() {
    const [city, setCity] = useState([]);
    useEffect(async () => {
        await fetch("get-city")
            .then(response => response.json())
            // .then(res => console.log(res));
            .then(res => setCity(res));
    });

    return city;
}
