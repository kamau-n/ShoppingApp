import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  total: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
});

const QuotationPDF = ({ items, total, user, business }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Quotation</Text>
        <Text style={styles.subtitle}>
          Date: {new Date().toLocaleDateString()}
        </Text>
        <Text style={styles.subtitle}>Reference: QT-{Date.now()}</Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, marginBottom: 5 }}>Customer Details:</Text>
        <Text>
          {user.user_first_name} {user.user_last_name}
        </Text>
        <Text>{user.user_address}</Text>
        <Text>
          {user.user_city}, {user.user_county}
        </Text>
        <Text>{user.user_email}</Text>
      </View>

      {business && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>
            Business Details:
          </Text>
          <Text>{business.business_name}</Text>
        </View>
      )}

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Item</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Price</Text>
          <Text style={styles.tableCell}>Total</Text>
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name.name}</Text>
            <Text style={styles.tableCell}>{item.name.quantity}</Text>
            <Text style={styles.tableCell}>
              KSH {item.name.price.toLocaleString()}
            </Text>
            <Text style={styles.tableCell}>
              KSH {(item.name.price * item.name.quantity).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <Text>Total: KSH {total.toLocaleString()}</Text>
      </View>

      <View style={styles.footer}>
        <Text>This quotation is valid for 30 days from the date of issue.</Text>
        <Text>Thank you for your interest in our products.</Text>
      </View>
    </Page>
  </Document>
);

export default QuotationPDF;
