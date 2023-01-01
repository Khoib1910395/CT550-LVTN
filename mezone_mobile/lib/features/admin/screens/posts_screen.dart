import 'package:flutter/material.dart';
import 'package:mezone/common/widgets/loader.dart';
import 'package:mezone/constants/utils.dart';
import 'package:mezone/features/account/widgets/single_product.dart';
import 'package:mezone/features/admin/screens/add_product_screen.dart';
import 'package:mezone/features/admin/services/admin_services.dart';
import 'package:mezone/models/product.dart';

class PostsScreen extends StatefulWidget {
  const PostsScreen({Key? key}) : super(key: key);

  @override
  State<PostsScreen> createState() => _PostsScreenState();
}

class _PostsScreenState extends State<PostsScreen> {
  List<Product>? products;
  final AdminServices adminServices = AdminServices();

  @override
  void initState() {
    super.initState();
    fetchAllProducts();
  }

  fetchAllProducts() async {
    products = await adminServices.fetchAllProducts(context);
    setState(() {});
  }

  void deleteProduct(Product product, int index) {
    adminServices.deleteProduct(
      context: context,
      product: product,
      onSuccess: () {
        showSnackBar(context, 'Product deleted!');
        products!.removeAt(index);
        setState(() {});
      },
    );
  }

  void navigateToAddProduct() {
    Navigator.pushNamed(context, AddProductScreen.routeName);
  }

  void increaseQuantity(Product product) {
    product.quantity++;
  }

  void decreaseQuantity(Product product) {
    product.quantity--;
  }

  @override
  Widget build(BuildContext context) {
    return products == null
        ? const Loader()
        : Scaffold(
            body: GridView.builder(
              itemCount: products!.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
              ),
              itemBuilder: (context, index) {
                final productData = products![index];
                return Column(
                  children: [
                    SizedBox(
                      height: 140,
                      child: SingleProduct(
                        image: productData.images[0],
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(
                          child: Text(
                            productData.name,
                            overflow: TextOverflow.ellipsis,
                            maxLines: 2,
                          ),
                        ),
                        Row(
                          children: [
                            InkWell(
                              onTap: () => decreaseQuantity(productData),
                              child: Container(
                                width: 35,
                                height: 32,
                                alignment: Alignment.center,
                                child: const Icon(
                                  Icons.remove,
                                  size: 18,
                                ),
                              ),
                            ),
                            DecoratedBox(
                              decoration: BoxDecoration(
                                border: Border.all(
                                    color: Colors.black12, width: 1.5),
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(0),
                              ),
                              child: Container(
                                width: 35,
                                height: 32,
                                alignment: Alignment.center,
                                child: Text(
                                  productData.quantity.toInt().toString(),
                                ),
                              ),
                            ),
                            InkWell(
                              onTap: () => increaseQuantity(productData),
                              child: Container(
                                width: 35,
                                height: 32,
                                alignment: Alignment.center,
                                child: const Icon(
                                  Icons.add,
                                  size: 18,
                                ),
                              ),
                            ),
                          ],
                        ),
                        IconButton(
                          onPressed: () => showDialog(
                            context: context,
                            builder: (BuildContext context) => AlertDialog(
                              title: const Text('Deleted Alert'),
                              content: const Text(
                                  'Are you sure you want to delete this product?'),
                              actions: <Widget>[
                                TextButton(
                                  onPressed: () =>
                                      Navigator.pop(context, 'Cancel'),
                                  child: const Text('Cancel'),
                                ),
                                TextButton(
                                  onPressed: () => {
                                    deleteProduct(productData, index),
                                    Navigator.pop(context),
                                  },
                                  child: const Text('Yes'),
                                ),
                              ],
                            ),
                          ),
                          icon: const Icon(
                            Icons.delete_outline,
                          ),
                        ),
                      ],
                    ),
                  ],
                );
              },
            ),
            floatingActionButton: FloatingActionButton(
              onPressed: navigateToAddProduct,
              tooltip: 'Add a new product',
              child: const Icon(Icons.add),
            ),
            floatingActionButtonLocation:
                FloatingActionButtonLocation.centerFloat,
          );
  }
}
