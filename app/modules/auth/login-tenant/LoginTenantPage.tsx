import React from 'react';

import { OrderTakerCodeCard } from './children/OrderTakerCodeCard';

export default function LoginTenantPage() {

    return (
        <div className="login-page default-bg position-fixed d-flex align-items-center" style={{ width: "100%", height: "100%", }}>
            <div className="login-page-inner w-100 d-flex justify-content-center">
                <OrderTakerCodeCard
                />
            </div>
        </div>
    )
}
