import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('peminjaman');
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
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { no, kodebarang, nama, tanggalpinjam, tanggalkembali, peminjam, jumlahpeminjam } = this.state;

    this.ref.add({
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
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { no, kodebarang, nama, tanggalpinjam, tanggalkembali, peminjam, jumlahpeminjam } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
        <div class="panel-heading">
            <h1 class="panel-title">
            <center>Sistem Inventaris Sekolah Berbasis Website</center>
            </h1>
            <hr />
            <h3>Menu Peminjaman</h3>
          </div>
          <div class="panel-body">
            
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">No :</label>
                <input type="number" class="form-control" name="no" value={no} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="body">Kode Barang :</label>
                <input type="text" class="form-control" name="kodebarang" value={kodebarang} onChange={this.onChange} placeholder="Contoh: BRG1" />
              </div>
              <div class="form-group">
                <label for="body">Nama :</label>
                <input type="text" class="form-control" name="nama" value={nama} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="author">Tanggal Pinjam</label>
                <input type="text" class="form-control" name="tanggalpinjam" value={tanggalpinjam} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="author">Tanggal Kembali</label>
                <input type="text" class="form-control" name="tanggalkembali" value={tanggalkembali} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="author">Peminjam</label>
                <input type="text" class="form-control" name="peminjam" value={peminjam} onChange={this.onChange} placeholder="" />
              </div>
              <div class="form-group">
                <label for="author">Jumlah Pinjam</label>
                <input type="number" class="form-control" name="jumlahpeminjam" value={jumlahpeminjam} onChange={this.onChange} placeholder="" />
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

export default Create;
