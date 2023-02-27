import React, { useState } from 'react';

const useHeader = (initialHeader: string) => {
    const [headerName, setHeader] = useState(initialHeader);

    return { headerName, setHeader };
};

export default useHeader;
