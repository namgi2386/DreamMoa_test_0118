// src/components/Live2DModel.jsx
import React, { useEffect, useRef } from 'react';

const Live2DModel = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const initLive2D = async () => {
      try {
        // PixiJS 앱 생성
        const app = new PIXI.Application({
          view: canvasRef.current,
          transparent: true,
          width: 600,
          height: 400,
          autoStart: true,
        });

        // Live2DModel 로드 
        // const model = await PIXI.live2d.Live2DModel.from('/Haru/Haru.model3.json');
        // const model = await PIXI.live2d.Live2DModel.from('/Mark/Mark.model3.json');
        const model = await PIXI.live2d.Live2DModel.from('/Wanko/Wanko.model3.json');

        // 모델 크기 및 위치 설정
        model.scale.set(0.3);
        model.position.set(10, 10);

        // 스테이지에 모델 추가
        app.stage.addChild(model);

        // 기본 모션 설정 (idle) for Haru
        if (model.motion) {
          const motionName = "haru_g_m26";
          model.motion(motionName);
        }
        // 기본 모션 설정 (idle) for wanko
        // if (model.motion) {
        //   const motionName = "idle_04";
        //   model.motion(motionName);
        // }
        // 기본 모션 설정 (idle) for mark
        // if (model.motion) {
        //   // const motionIdx = Math.floor(Math.random() * 4) + 1;
        //   // const motionName = `idle_0${motionIdx}`;
        //   const motionName = "mark_m01";
        //   model.motion(motionName);
        // }

        // 클릭 이벤트 처리
        model.on('click', async () => {
          const touchIdx = Math.floor(Math.random() * 6) + 1;
          const motionName = `touch_0${touchIdx}`;
          await model.motion(motionName);
        });

        // 컴포넌트 언마운트 시 정리
        return () => {
          app.destroy(true);
        };
      } catch (error) {
        console.error('Live2D 모델 로드 실패:', error);
      }
    };

    initLive2D();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Live2DModel;