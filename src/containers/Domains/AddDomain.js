/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useHistory} from "react-router";
import { toastr } from "react-redux-toastr";
import ApiHelper from "../../helpers/apiHelper";
import { containsSpecialChars } from "../../helpers/commonHelper";
import "./addDomain.css";
import * as variables from "../../variables/variables"
export default function AddDomain() {
  const [fileData, setFileData] = useState(null);
  const [domainList, setDomainList] = useState(null);
  const hiddenFileInput = React.useRef(null);
  const history = useHistory();

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleFile = e => {
    if(checkFileSize) {
      setFileData(e.target.files[0])
    }
  };

  const checkFileSize = e => {
    let files = e.target.files
    let size = 2 * 1024 * 1024
    let err = [];
    for(let x = 0; x<files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].name + ' is too large, please pick a smaller than 2M\n';
      }
    }
    for(let z = 0; z<err.length; z++) {
      toastr.error(err[z])
      e.target.value = null
    }
    return true;
  }

  const handleSend = e => {
    e.preventDefault()

    if (domainList === null && !fileData) {
      toastr.warning('Warning!', 'Please type domains or import a file to upload.');
      return true
    }

    if (containsSpecialChars(domainList)) {
      toastr.warning('Warning!', 'Please remove special characters in domain name.');
      return true
    }

    let formData = new FormData();
    formData.append('domain_list', domainList);
    formData.append('file', fileData)

    ApiHelper.post(variables.API_URL + '/api/domains/', formData,
    {
      'content-type': 'multipart/form-data'
    }
    ).then(res => {
      toastr.success('Success', 'Successfully Added.');
      history.push('/my_stable/portfolio');
    }).catch(err => {
      toastr.error('Fail!', 'Failed to add domains')
    })
  }

  return (
    <div className="addDomain">
      <div className="container">
        <div className="row">
        <div className="col-xs-12">
          <div className="panelView">
            <span className="h3">Import domain list or upload a file below</span>
            <div className="uploadPanel">
              <textarea
                placeholder="Separate domain with a comma, space, or line break. example.com, 5000"
                value={domainList} onChange={e => setDomainList(e.target.value)}
              />
              <div className="uploadControl">
                <input type="file" name="file" ref={hiddenFileInput} onChange={handleFile} style={{display: 'none'}}/>
                <button data-title="One domain per row(.xls, .csv file), and one domain per line(.txt file)" className="file_upload" onClick={handleClick}><i className="fa fa-plus"></i>Drop or click here to upload</button>
                {/* <p>One domain per row(.xls, .csv file), and one domain per line(.txt file)</p> */}
                <button className="btn btn-submit" onClick={handleSend}>Import domains</button>
              </div>
            </div>
            <p className="file-name">{fileData ? fileData.name : ''}</p>
          </div>
        </div>
        </div>
      </div>
      <div className="main bg-dark build-dream">
        <div className="container text-center">
          <h3 className="mt-5 d-page" style={{color: '#ff5301'}}><span>How To Set Up And Point Your Domain Names to STUD.COM</span></h3>
          <div className="row">
            <div className="col-md-12">
              <div className="option-domain">
                <h4>Change the Name Servers(NS Records)</h4>
                <p>Change the name servers (NS Records) of your domains to the following:</p>
                <div className="dpage-table">
                  <table className="w-100">
                    <tbody>
                      <tr>
                      <td>NS1.STUD.COM</td>
                      </tr>
                      <tr>
                      <td>NS2.STUD.COM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="mt-3" style={{color: '#008b8b'}}><b>Please note:</b> It can take up to 24 hours to propagate your landing pages.</p>
              <div className="submit-post mt-5">
                <a href="#" style={{borderRadius: '0px'}}>Nameserver Options</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
