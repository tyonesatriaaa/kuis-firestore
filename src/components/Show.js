import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pinjam: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('peminjaman').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          pinjam: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('peminjaman').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
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
          <h3>Tampilam Menu Peminjaman</h3>
        </div>
        <div class="panel-body">
            <dl>
              <dt>No :</dt>
              <dd>{this.state.pinjam.no}</dd>
              <dt>kode Barang:</dt>
              <dd>{this.state.pinjam.kodebarang}</dd>
              <dt>Nama :</dt>
              <dd>{this.state.pinjam.nama}</dd>
              <dt>Tanggal Pinjam:</dt>
              <dd>{this.state.pinjam.tanggalpinjam}</dd>
              <dt>tanggal Kembali :</dt>
              <dd>{this.state.pinjam.tanggalkembali}</dd>
              <dt>Peminjam :</dt>
              <dd>{this.state.pinjam.peminjam}</dd>
              <dt>Jumlahh Pinjaman:</dt>
              <dd>{this.state.pinjam.jumlahpeminjam}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>&nbsp;
            <Link to="/" class="btn btn-primary">Kembali</Link>

          </div>
        </div>
      </div>
    );
  }
}

export default Show;
