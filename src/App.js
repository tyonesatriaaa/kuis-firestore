import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('peminjaman');
    this.unsubscribe = null;
    this.state = {
      peminjaman: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const peminjaman = [];
    querySnapshot.forEach((doc) => {
      const { no, kodebarang, nama, tanggalpinjam, tanggalkembali, peminjam, jumlahpeminjam  } = doc.data();
      peminjaman.push({
        key: doc.id,
        doc, // DocumentSnapshot
        no,
        kodebarang,
        nama,
        tanggalpinjam,
        tanggalkembali,
        peminjam,
        jumlahpeminjam,
      });
    });
    this.setState({
      peminjaman
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
            <h3>Menu Peminjaman</h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Tambah Data Peminjaman</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode Barang</th>
                  <th>Nama</th>
                  <th>Tanggal Pinjam</th>
                  <th>Tanggal Kembali</th>
                  <th>Peminjam</th>
                  <th>Jumlah Pinjaman</th>
                </tr>
              </thead>
              <tbody>
                {this.state.peminjaman.map(pinjam =>
                  <tr>
                    <td><Link to={`/show/${pinjam.key}`}>{pinjam.no}</Link></td>
                    <td>{pinjam.kodebarang}</td>
                    <td>{pinjam.nama}</td>
                    <td>{pinjam.tanggalpinjam}</td>
                    <td>{pinjam.tanggalkembali}</td>
                    <td>{pinjam.peminjam}</td>
                    <td>{pinjam.jumlahpeminjam}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
