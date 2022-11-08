import React from 'react';
import PreviewImage from './PreviewImage';
import Wrapper from '@plone/volto/storybook';
//import preview from '../../../storybook-public/preview.png';

const PreviewImageComponent = (props) => {
  const { item, size = 'preview', alt, ...rest } = props;
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <PreviewImage item={item} alt={alt} size={size} {...rest} />
        <img src="/preview.png" width={100} alt="myTestImage" />
      </div>
    </Wrapper>
  );
};

const item = {
  '@id': 'http://localhost:3000/something',
  title: 'Item title',
  //image_field: 'preview_image',
  // '@@images': {
  //   preview_image: {
  //     'content-type': 'image/png',
  //     download: 'testImage',
  //     filename: 'Screenshot 2022-11-08 at 12.30.42.png',
  //     height: 830,
  //     scales: {
  //       preview: {
  //         download: 'testImage',
  //         height: 830,
  //         width: 828,
  //       },
  //     },
  //   },
  // },
};

export const Default = PreviewImageComponent.bind({});
Default.args = {
  item: item,
};

export default {
  title: 'Internal Components/PreviewImage',
  component: PreviewImageComponent,
  argTypes: {},
};

// {
// 	"preview_image": {
// 		"content-type": "image/png",
// 		"download": "http://localhost:3000/test-event/@@images/3fb69b29-5b30-4b05-bf2d-4aa3826ada7d.png",
// 		"filename": "Screenshot 2022-11-08 at 12.30.42.png",
// 		"height": 830,
// 		"scales": {
// 			"great": {
// 				"download": "http://localhost:3000/test-event/@@images/4bf0c644-85d0-4bf4-af77-c48fd3fb0998.png",
// 				"height": 830,
// 				"width": 828
// 			},
// 			"huge": {
// 				"download": "http://localhost:3000/test-event/@@images/97f502c8-8986-4c6d-88e8-079690bee8c2.png",
// 				"height": 830,
// 				"width": 828
// 			},
// 			"icon": {
// 				"download": "http://localhost:3000/test-event/@@images/4aff6ee1-161a-445c-9160-62ce9b930b0a.png",
// 				"height": 32,
// 				"width": 32
// 			},
// 			"large": {
// 				"download": "http://localhost:3000/test-event/@@images/5c816924-24dd-4448-8f33-c9b2ebb95e60.png",
// 				"height": 801,
// 				"width": 800
// 			},
// 			"larger": {
// 				"download": "http://localhost:3000/test-event/@@images/6063d15e-bf1c-48bc-8e73-c39d92cad18e.png",
// 				"height": 830,
// 				"width": 828
// 			},
// 			"mini": {
// 				"download": "http://localhost:3000/test-event/@@images/c93580c5-a972-4a2b-b47a-b06200566350.png",
// 				"height": 200,
// 				"width": 200
// 			},
// 			"preview": {
// 				"download": "http://localhost:3000/test-event/@@images/90f882dd-3ca8-4dc3-b653-a3c562f96e2e.png",
// 				"height": 400,
// 				"width": 400
// 			},
// 			"teaser": {
// 				"download": "http://localhost:3000/test-event/@@images/a00a2c3b-6e3b-468c-ab56-2a72c9ca518f.png",
// 				"height": 601,
// 				"width": 600
// 			},
// 			"thumb": {
// 				"download": "http://localhost:3000/test-event/@@images/8870a98f-f221-4e7a-8c31-9889b496ec83.png",
// 				"height": 128,
// 				"width": 128
// 			},
// 			"tile": {
// 				"download": "http://localhost:3000/test-event/@@images/3bb85bd1-f6d3-4418-a3b3-024acce18a8c.png",
// 				"height": 64,
// 				"width": 64
// 			}
// 		},
// 		"size": 1074210,
// 		"width": 828
// 	}
// }
