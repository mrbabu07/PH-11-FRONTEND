import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import useAxios from '../../hooks/useAxios';

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get('session_id');
    const axios = useAxios();

    useEffect(()=> {
        axios.post(`/payment-success?session_id=${session_id}`)  
        .then(res => {
            console.log('Payment success recorded:', res.data);
        }
        ).catch(err => {
            console.error('Error recording payment success:', err);
        });

    }, [axios, session_id])
    return (
        <div>
            payment successfull
        </div>
    )
}

export default PaymentSuccess
