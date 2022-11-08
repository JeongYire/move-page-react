import React, { useState } from 'react';
import { Content, Header, HeaderColumn, SamplePage } from './components';
import { MoveAnimation, RotateAnimation } from './components/Animation';
import { PageMode } from './types';


function App() {

  const [mode,SetMode] = useState<PageMode>('move');

  return (
    <React.Fragment>
      <Header>
        <HeaderColumn mode={'move'} on={mode === 'move'} setMode={() => SetMode('move')}/>
        <HeaderColumn mode={'rotate'} on={mode === 'rotate'} setMode={() => SetMode('rotate')}/>
      </Header>
      <Content>
        <>
        {
          mode == 'move' && (
          <MoveAnimation>
              <SamplePage titleNumber={999} />
              <SamplePage titleNumber={555} />
              <SamplePage titleNumber={777} />
              <SamplePage titleNumber={123} />
              <SamplePage titleNumber={456} />
              <SamplePage titleNumber={666} />
          </MoveAnimation>
          )
        }
        {
          mode == 'rotate' && (
            <RotateAnimation>
              <SamplePage titleNumber={999} />
              <SamplePage titleNumber={555} />
              <SamplePage titleNumber={777} />
              <SamplePage titleNumber={123} />
              <SamplePage titleNumber={456} />
              <SamplePage titleNumber={666} />
            </RotateAnimation>
          )
        }
        </>
      </Content>
    </React.Fragment>
  );
}

export default App;
