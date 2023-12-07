import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ExampleComponent 의 데이터 / 계산 / 액션 분리하기
 * @returns 
 */
function ExampleComponent() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  /**
   * data를 fetching 해온다
   * @param {string} url 
   * @returns {Promise<object>}
   */
  const fetchData = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

  const redirectPage = useCallback((url) => {
    navigate(url);
  }, [navigate]);


  useEffect(() => {
    async function controller() {
      const data = await fetchData('https://some-api.com/data');
      setData(data);

      if (data.needsRedirect) {
        redirectPage('/redirect-page');
      }
    }

    controller();
  }, [redirectPage]);

  // ... 다른 로직과 JSX 반환

  return (
    <div>
      {/* 여기에 컴포넌트의 UI 렌더링 로직이 있을 것입니다. */}
    </div>
  );
}

export default ExampleComponent;