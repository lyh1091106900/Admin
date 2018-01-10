import React, { Component, PropTypes } from 'react';
import { Upload, Icon, message } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isPNG = file.type === 'image/png';
	if (!isPNG) {
		message.error('You can only upload PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isPNG && isLt2M;
}

class Avatar extends React.Component {
	state = {
		loading: false,
	};
	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.

			getBase64(info.file.originFileObj, imageUrl => {
				this.setState({
					loading: false,
					imageUrl: imageUrl
				})

			});
		}
		else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	}
	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		//console.log('render',this.state.imageUrl);
		const imageUrl = this.state.imageUrl ? this.state.imageUrl : this.props.imageUrl;//上传后直接改变state的值
		//console.log('render',this.state.imageUrl,this.props.imageUrl);
		return (
			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action="//127.0.0.1:7001/api/upload"
				beforeUpload={beforeUpload}
				onChange={this.handleChange}
			>
				{imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
			</Upload>
		);
	}
}

export default Avatar