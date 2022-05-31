import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      no: '',
      kodebarang: '',
      nama: '',
      tanggalpinjam: '',
      tanggalkembali: '',
      peminjam: '',
      jumlahpeminjam: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('peminjaman').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const pinjam = doc.data();
        this.setState({
          key: doc.id,
          no: pinjam.no,
          kodebarang: pinjam.kodebarang,
          nama: pinjam.nama,
          tanggalpinjam: pinjam.tanggalpinjam,
          tanggalkembali: pinjam.tanggalkembali,
          peminjam: pinjam.peminjam,
          jumlahpeminjam: pinjam.jumlahpeminjam
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({pinjam:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { no, kodebarang, nama, tanggalpinjam, tanggalkembali, peminjam, jumlahpeminjam} = this.state;

    const updateRef = firebase.firestore().collection('peminjaman').doc(this.state.key);
    updateRef.set({
      no,
      kodebarang,
      nama,
      tanggalpinjam,
      tanggalkembali,
      peminjam,
      jumlahpeminjam
    }).then((docRef) => {
      this.setState({
        no: '',
        kodebarang: '',
        nama: '',
        tanggalpinjam: '',
        tanggalkembali: '',
        peminjam: '',
        jumlahpeminjam: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
      <div class="panel panel-default">
      <div class="panel-heading">
          <h1 class="panel-title">
          <center>Sistem Inventaris Sekolah Berbasis Website</center>
          </h1>
          <hr />
          <h3>EDIT Menu Peminjaman</h3>
        </div>
        <div class="panel-body">
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="title">No :</label>
                <input type="number" class="form-control" name="no" value={this.state.no} onChange={this.onChange} placeholder="No" />
              </div>
              <div class="form-group">
                <label for="body">Kode Barang :</label>
                <input type="text" class="form-control" name="author" value={this.state.kodebarang} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="body">Nama :</label>
                <input type="text" class="form-control" name="author" value={this.state.nama} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="author">Tanggal Pinjam</label>
                <input type="text" class="form-control" name="author" value={this.state.tanggalpinjam} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="author">Tanggal Kembali</label>
                <input type="text" class="form-control" name="author" value={this.state.tanggalkembali} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="author">Peminjam</label>
                <input type="text" class="form-control" name="author" value={this.state.peminjam} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="author">Jumlah Pinjam</label>
                <input type="number" class="form-control" name="author" value={this.state.jumlahpeminjam} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button> &nbsp;
              <Link to="/" class="btn btn-primary">Kembali</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
